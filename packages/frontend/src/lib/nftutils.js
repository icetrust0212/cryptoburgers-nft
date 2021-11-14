import { config } from "../config";
import axios from 'axios';
import { apiService } from "../services";

export async function mintNFT(web3, nftContractInstance,  address, boxId,  onMintFail) {
  
  let tokenPrice = await nftContractInstance.methods.boxPriceBNB(boxId).call();
  console.log('tokenPrice: ', tokenPrice);

  return nftContractInstance.methods.mintNormal(boxId).send({value: tokenPrice, from: address}).on("receipt", function(res) {
    console.log('mint result: ', res);
    // onMintSuccess(res.events.NFTMintEvent);
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

export async function getBurgers(nftContractInstance, address) {
  let tokenAmount = await nftContractInstance.methods.balanceOf(address).call({from: address});
  console.log(tokenAmount);
  let tokenMetadatas = [];
  for (let i = 0; i < tokenAmount ; i ++) {
    let tokenId = await nftContractInstance.methods.tokenOfOwnerByIndex(address, i).call({from: address});
    let tokenUri = await nftContractInstance.methods.tokenURI(tokenId).call({from: address});
    let metadata = await getMetadata(tokenUri);
    tokenMetadatas.push({
      ...metadata,
      tokenId
    });
  }
  return tokenMetadatas;
}


export async function enableWhitelistMode(nftContractInstance, address, isEnable = false) {
  let rsp = await nftContractInstance.methods.changeWhitelistState(isEnable).send({from: address});
  return rsp;
}