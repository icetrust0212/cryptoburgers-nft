import { config } from "../config";
import axios from 'axios';

export function mintNFT(web3, nftContractInstance,  address, metadata, onMintSuccess, onMintFail) {
  const priceWei = web3.utils.toWei("0.000001", "ether"); // Convert to wei value;
  let messageHash = web3.eth.accounts.hashMessage(metadata.message);
  console.log('messageHash: ', messageHash);
  return nftContractInstance.methods.mint(address, metadata.message, messageHash,  metadata.signature).send({value: priceWei, from: address}).on("receipt", function(res) {
    console.log('mint result: ', res);
    onMintSuccess(res.events.NFTMintEvent);
  }).on('error', err => {
    console.log('mint error: ', err);
    onMintFail(err);
  });
}

export async function withdrawEth(nftContractInstance) {
  return await nftContractInstance.methods.withdrawAll().send({from: config.PUBLIC_KEY});
}

export async function setPauseState(nftContractInstance, value) {
  return await nftContractInstance.methods.setPause(value).send({from: config.PUBLIC_KEY});
}

export async function getPauseState(nftContractInstance) {
  return await nftContractInstance.methods.getPause().call();
}

export async function addWhiteList(nftContractInstance, _address) {
  console.log('whitelist: ', _address)
  return await nftContractInstance.methods.addWhiteList(_address).send({from: config.PUBLIC_KEY});
}

export async function removeWhiteList(nftContractInstance, _address) {
  return await nftContractInstance.methods.removeWhiteList(_address).send({from: config.PUBLIC_KEY});
}

export async function getMetadata(uri) {

  let data = await axios.get(uri).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log('err: ', err)
  });

  console.log('metadata: ', data);
  return data;
}

export async function getRemainCount(nftContractInstance) {
  return await nftContractInstance.methods.remainTokenCount().call();
}