import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'
import { apiAction } from '../store/actions'
import { getAddress, getChainId, getNFTContractInstance, getProvider, getWeb3Instance } from '../store/reducers'
import { getMetadata, mintNFT } from '../lib/nftutils';
import CustomModal from '../components/Modal'
import { apiConstants } from '../store/constants';
import getSocket from '../services/socket'


function Mint({ handleNotification }) {
    const dispatch = useDispatch();
    const [isModalShow, setModalShow] = useState(false);
    const [nftData, setNftData] = useState({});
    const address = useSelector(state => getAddress(state));
    const web3Instance = useSelector(state => getWeb3Instance(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const provider = useSelector(state => getProvider(state));
    const chainId = useSelector(state => getChainId(state));

    const onMintSuccess = async (metadata) => {
        handleNotification('success', `NFT #${metadata.tokenId} is minted successfully `);
        setNftData(metadata);
        setModalShow(true);
        dispatch(apiAction.setLoading(false))
    }

    const onMintFail = (error) => {
        console.error("Mint Failed", error);
        handleNotification("error", 'NFT Mint is failed');
        dispatch(apiAction.setLoading(false));
    }

    const mintNFT = (boxId) => {
        dispatch(apiAction.mintNFT(boxId, web3Instance, nftContractInstance, address, onMintFail));
    }

    const setWhitelistMode = () => {
        dispatch(apiAction.setWhitelistMode(nftContractInstance, address, true));
    }

    useEffect(() => {
        //establish socket connection for notification after nft minting
        //we will use wallet address as socket id
        if (address && provider) {
            if (chainId !== 4) {
                handleNotification('Please switch to Rinkeby network');
                return;
            }
            const webSocket = getSocket(address);
            webSocket.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                console.log('Received message from server: ', msg);
                switch (msg.type) {
                    case 'METADATA':
                        onMintSuccess(msg.data);
                        break;
                    case 'ERROR':
                        onMintFail(msg.error);
                        break;
                    default:
                        break;
                }
            }
        } else {
            handleNotification("warning", 'You are not connected mainnet');
        }
    }, [provider, address, chainId]);
    return (
        <Container>
            <Header handleNotification={handleNotification} />
            <Row>
                <CustomButton text={'Box1'} isLoading={false} onClick={() => { mintNFT(0) }} disabled={false} />
                <CustomButton text={'Box2'} isLoading={false} onClick={() => { mintNFT(1) }} disabled={false} />
                <CustomButton text={'Box3'} isLoading={false} onClick={() => { mintNFT(2) }} disabled={false} />

                {/* admin */}
                <CustomButton text={'whitelist'} onClick={() => { setWhitelistMode() }} disabled={false} />
            </Row>
            <CustomModal show={isModalShow} data={nftData} handleClose={() => {
                setModalShow(false);
            }} />
        </Container>
    )
}

export default Mint

const Container = styled.div`
    overflow-x: hidden;
    background-image: url(/images/mint_burgers_background_green.svg);
    height: 100vh;
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: fit-content;
    width: 500px;
`

