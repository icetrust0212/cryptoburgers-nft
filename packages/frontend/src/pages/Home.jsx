import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CustomButton from '../components/CustomButton'
import MintHeader from '../components/MintHeader'
import { apiAction } from '../store/actions'
import { getAddress, getNFTContractInstance, getWeb3Instance } from '../store/reducers'
import { getMetadata, mintNFT } from '../lib/nftutils';
import CustomModal from '../components/Modal'
function Home({handleNotification}) {
    const dispatch = useDispatch();
    const [isMinting, setIsMinting] = useState(false);
    const [isModalShow, setModalShow] = useState(true);
    const [nftData, setNftData] = useState({});
    const address = useSelector(state => getAddress(state));
    const web3Instance = useSelector(state => getWeb3Instance(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    
    const onMintSuccess = async (event) => {
        handleNotification('success', `NFT #${event.returnValues.id} is minted successfully `);
        setIsMinting(false);
        let metadata = await getMetadata(event.returnValues.tokenURI);
        metadata.tokenId = event.returnValues.id;
        setNftData(metadata);
        setModalShow(true);
        console.log('token data: ', metadata);
    }
    const onMintFail = (error) => {
        console.error("Mint Failed", error);
        setIsMinting(false)
        handleNotification("error", 'NFT Mint is failed');
    }
    //Mint NFT
    const mint = async (metadata) => {
        setIsMinting(true);
        mintNFT(web3Instance, nftContractInstance, address, metadata, onMintSuccess, onMintFail);
    };

    const onRequestMetadataSuccess = (metadata) => {
        console.log('metadata: ', metadata);
        mint(metadata);
    }
    const onRequestMetadataFail = (metadata) => {

    }
    const requestMetadata = (boxId) => {
        dispatch(apiAction.requestMetadata(boxId, onRequestMetadataSuccess, onRequestMetadataFail));
    }
    return (
        <Container>
            <MintHeader handleNotification={handleNotification}/>
            <Row>
                <CustomButton text={'Box1'} isLoading={false} onClick={() => {requestMetadata(1)}} disabled={false} />
                <CustomButton text={'Box2'} isLoading={false} onClick={() => {requestMetadata(2)}} disabled={false} />
                <CustomButton text={'Box3'} isLoading={false} onClick={() => {requestMetadata(3)}} disabled={false} />
            </Row>
            <CustomModal show={isModalShow} data={nftData} handleClose={() => {
                setModalShow(false);
            }}/>
        </Container>
    )
}

export default Home

const Container = styled.div`
    overflow-x: hidden;
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: fit-content;
    width: 500px;
`

