import { config } from "../config";
import axios from 'axios';


export async function mintNFT(web3: any, nftContractInstance: any,  address: string, metadata: any) {
  const priceWei = web3.utils.toWei("0.000001", "ether"); // Convert to wei value;
  console.log('mint data: ', web3, nftContractInstance, address, metadata);
  await nftContractInstance.methods.mint(address, metadata.message, metadata.messageHash, metadata.signature).send({value: priceWei, from: address});
}

export async function withdrawEth(nftContractInstance: any) {
  return await nftContractInstance.methods.withdrawAll().send({from: config.PUBLIC_KEY});
}

export async function setPauseState(nftContractInstance: any, value: boolean) {
  return await nftContractInstance.methods.setPause(value).send({from: config.PUBLIC_KEY});
}

export async function getPauseState(nftContractInstance: any) {
  return await nftContractInstance.methods.getPause().call();
}

export async function addWhiteList(nftContractInstance: any, _address: string) {
  console.log('whitelist: ', _address)
  return await nftContractInstance.methods.addWhiteList(_address).send({from: config.PUBLIC_KEY});
}

export async function removeWhiteList(nftContractInstance: any, _address: string) {
  return await nftContractInstance.methods.removeWhiteList(_address).send({from: config.PUBLIC_KEY});
}

export async function getMetadata(uri: string) {

  let data = await axios.get(uri).then((res: any) => {
    return res.data;
  }).catch((err: any) => {
    console.log('err: ', err)
  });

  console.log('metadata: ', data);
  return data;
}

export async function getRemainCount(nftContractInstance: any) {
  return await nftContractInstance.methods.remainTokenCount().call();
}