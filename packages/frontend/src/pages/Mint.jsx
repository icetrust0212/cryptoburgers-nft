import { useCallback, useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getChainId, getNFTContractInstance, getProvider, getWeb3Instance, getWeb3Provider, getWSSNFTContractInstance, getWSSWeb3Instance, getContractAddress, getContractABI } from '../store/reducers'
import { mintNFT, withdrawEth, addWhiteList, removeWhiteList, setPauseState, getPauseState, getTokenUri, getRemainCount } from '../lib/nftutils';
import { config } from '../config'
//@ts-ignore
import styled from 'styled-components';
import CustomButton from '../components/CustomButton';
import MintHeader from '../components/MintHeader';

export const MintPage = ({handleNotification}) => {
  const provider = useSelector(state => getProvider(state));
  const address = useSelector(state => getAddress(state));
  const chainId = useSelector(state => getChainId(state));
  const web3Instance = useSelector(state => getWeb3Instance(state));
  // const wssWeb3Instance = useSelector(state => getWSSWeb3Instance(state));
  const nftContractInstance = useSelector(state => getNFTContractInstance(state));
  const wssNFTContractInstance = useSelector(state => getWSSNFTContractInstance(state));
  const contractAddress = useSelector(state => getContractAddress(state));
  // const contractABI = useSelector(state => getContractABI(state))

  const [address1, setAddress1] = useState(''); // address that will be added whitelist
  const [address2, setAddress2] = useState(''); // address that will be removed whitelist 
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isSettingPause, setIsSettingPause] = useState(false);
  const [isAddingWhitelist, setIsAddingWhitelist] = useState(false);
  const [isRemovingWhitelist, setIsRemovingWhitelist] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [tokenImageUri, setTokenImageUri] = useState('');
  const totalAmount = 6;
  const [remainCount, setRemainCount] = useState(totalAmount);
  const [gamePauseState, setGamePauseState] = useState(false);
  const price = 0.0002;
  const maxAmount = 10;
  
  useEffect(() => {
    if (!provider) {
      handleNotification('warning', 'You are not connected on this site');
    } else {
      if (chainId != config.TEST_CHAINID) {
        handleNotification('warning', 'Please switch Polygon Test net' );
        return;
      }
      handleNotification('success', 'Connected!');
      console.log('address: ', address);
      if (address === config.PUBLIC_KEY) {
        setIsAdmin(true);
      }

      (async () => {
        setIsSettingPause(true)
        let state = await getPauseState(web3Instance, nftContractInstance, contractAddress);
        console.log('pauseState: ', state)
        setIsSettingPause(false)
        setGamePauseState(state);
      })();

      (async () => {
        let count = await getRemainCount(nftContractInstance);
        console.log('remainCount: ', count)
        setRemainCount(count);
      })();

      wssNFTContractInstance.events.RemainTokenCount({})
      .on('data', (event) => {
        console.log('Remain Counts: ', event, event.returnValues);
        setRemainCount(event.returnValues._count);
        handleNotification('warning', `${event.returnValues._count} NFTs remain`);
      });

      wssNFTContractInstance.events.PauseEvent({})
      .on('data', (event) => {
        console.log('Minting Pause: ', event, event.returnValues);
        handleNotification('warning', `NFT minting ${event.returnValues.pause ? 'PAUSE' : 'RESUME'}`);
        setGamePauseState(event.returnValues.pause);
        setIsSettingPause(false);
      }).on('error', (error) => {
        handleNotification('error', `Setting Pause/Play is failed`);
        setIsSettingPause(false);
      });

      wssNFTContractInstance.events.SoldOut({})
      .on('data', (event) => {
        console.log('Sold out: ', event, event.returnValues);
        handleNotification('warning', `NFT Sold out`);
      });

      wssNFTContractInstance.events.AddedWhiteList({filter: {_to: config.PUBLIC_KEY}})
      .on('data', (event) => {
        console.log('Added WhiteList: ', event, event.returnValues);
        handleNotification('success', `${event.returnValues._address} is added to Whitelist`);
        setIsAddingWhitelist(false);
      }).on('error', (error) => {
        handleNotification('error', `Adding whitelist is failed`);
        setIsAddingWhitelist(false);
      });

      wssNFTContractInstance.events.RemovedWhiteList({filter: {_to: config.PUBLIC_KEY}})
      .on('data', (event) => {
        console.log('Removed WhiteList: ', event, event.returnValues);
        handleNotification('success', `${event.returnValues._address} is removed to Whitelist`);
        setIsRemovingWhitelist(false);
      }).on('error', (error) => {
        handleNotification('error', `Removing whitelist is failed`);
        setIsRemovingWhitelist(false);
      });
    }
  }, [provider]);

  const mint = useCallback((amount) => {
    console.log('amount: ', amount);
    setIsMinting(true);
    mintNFT(web3Instance, nftContractInstance, address, contractAddress, price, amount).then(res => {
    }).catch(e => setIsMinting(false));
  }, [provider]);

  const withdraw = useCallback(() => {
    setIsWithdrawing(true);
    withdrawEth(web3Instance, nftContractInstance, contractAddress).then(res => setIsWithdrawing(false)).catch(e => setIsWithdrawing(false));
  }, [provider]);
  
  const addWhiteListAddress = useCallback(() => {
    setIsAddingWhitelist(true);
    addWhiteList(web3Instance, nftContractInstance, contractAddress, address1).then(res => setIsAddingWhitelist(false)).catch(e => setIsAddingWhitelist(false));
  }, [provider, address1]);

  const removeWhiteListAddress = useCallback(() => {
    setIsRemovingWhitelist(true);
    removeWhiteList(web3Instance, nftContractInstance, contractAddress, address2).then(res => setIsRemovingWhitelist(false)).catch(e => setIsRemovingWhitelist(false));
  }, [provider, address2]);

  const setPause = useCallback(() => {
    setIsSettingPause(true);
    setPauseState(web3Instance, nftContractInstance, contractAddress, !gamePauseState).then(res => setIsSettingPause(false)).catch(e => setIsSettingPause(false));
  }, [provider]);

  return (
      <DIV>
      <MintHeader></MintHeader>
      {
        provider ? (
          <>
                {
                  isAdmin && (
                    <div className="button-group" style={{display:'block', marginTop: '40px'}}>
                      <SubTitle>Only Admin</SubTitle>
                      <div style={{display: 'flex'}}>
                        <div className="btn-layout" style={{margin: '10px'}}>
                          <CustomButton text="Withdraw" onClick={withdraw} isLoading={isWithdrawing} />
                        </div>
                        <div className="btn-layout" style={{margin: '10px'}}>
                          <CustomButton text={gamePauseState ? "Play" : "Pause"} onClick={setPause} isLoading={isSettingPause} />
                        </div>
                      </div>
                      <div style={{display: "flex",flexDirection:'column'}}>
                        <div className="btn-layout" style={{margin: '10px'}}>
                          <Input type="text" className="Input" placeholder="Paste address" value={address1} onChange={(e) => {setAddress1(e.target.value)}}></Input>
                          <CustomButton text="Add to Whitelist" onClick={addWhiteListAddress} isLoading={isAddingWhitelist} />
                        </div>
                        <div className="btn-layout" style={{margin: '10px'}}>
                          <Input type="text" className="Input" value={address2} placeholder="Paste address" onChange={(e) => {setAddress2(e.target.value)}}></Input>
                          <CustomButton text="Remove from Whitelist" onClick={removeWhiteListAddress} isLoading={isRemovingWhitelist} />
                        </div> 
                      </div>
                    </div>
                  )
                }
            </>
        ) : (
          <Title>Please connect your Metamask</Title>
        )
      }
      </DIV>
  )
}

export default MintPage

const DIV = styled.div`
  padding:60px;
  min-height: 100vh;
  max-width: 1200px;
  margin: auto;
  height: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media(max-width: 991px) {
    padding: 10px;
  }
`

const Input = styled.input `
    width: fit-content;
    padding: 15px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    font-family: 'Festive', cursive;
    font-family: 'Space Mono', monospace;
    letter-spacing: 1.4px;
    background-color: #fff;
    color: #000;
    
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; 

    :hover{
      transform: scale(1.02);
      cursor: pointer;
      color: #222831;
    }
`

const Title = styled.h1`
    border: 2px solid white;
    border-radius: 12px;
    padding: 50px;
    width: 50%;
    color: white;
    min-width: 300px;
    margin: 200px auto;
    text-align: center;
`
const SubTitle = styled.h3`
    color: white;
    font-size: 20px;
`