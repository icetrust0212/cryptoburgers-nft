const {
    web3Config
} = require('../config');
const wssWeb3 = web3Config.wssWeb3;
const CONTRACT_INFO = require('../../../frontend/src/contracts.json');
const { generateMetadataForBoxType } = require('./metadata.service');
const {saveTokenMetadataToDB} = require('./mongoose');
const wssNFTContractInsance = new wssWeb3.eth.Contract(CONTRACT_INFO.contracts.Burger.abi, CONTRACT_INFO.contracts.Burger.address);
const wss = require('./socketServer');

wssNFTContractInsance.events.MintNFT({})
    .on('data', async (event) => {
        console.log('Mint result: ', event.returnValues._id, event.returnValues._to, event.returnValues._boxType);
        const metadata = generateMetadataForBoxType(event.returnValues._id, event.returnValues._boxType);
        const savedBurger = await saveTokenMetadataToDB(metadata);
        console.log('saved burger: ', savedBurger);
        wss.sendBroadcast({
            type: 'NEW_NFT',
            metadata: savedBurger,
            to: event.returnValues._to
        })
    }).on("error", (error) => {
        console.error("Mint Failed", error);
    });