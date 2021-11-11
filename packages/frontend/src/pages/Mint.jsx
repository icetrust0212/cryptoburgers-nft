import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'
import { apiAction } from '../store/actions'
import { getAddress, getNFTContractInstance, getProvider, getWeb3Instance } from '../store/reducers'
import { getMetadata, mintNFT } from '../lib/nftutils';
import CustomModal from '../components/Modal'
import { apiConstants } from '../store/constants';


function Mint({handleNotification}) {
    const dispatch = useDispatch();
    const [isModalShow, setModalShow] = useState(false);
    const [nftData, setNftData] = useState({});
    const address = useSelector(state => getAddress(state));
    const web3Instance = useSelector(state => getWeb3Instance(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));

    const onMintSuccess = async (event) => {
        handleNotification('success', `NFT #${event.returnValues.id} is minted successfully `);
        let metadata = await getMetadata(event.returnValues.tokenURI);
        metadata.tokenId = event.returnValues.id;
        setNftData(metadata);
        setModalShow(true);
        dispatch(apiAction.setLoading(false))
    }
    const onMintFail = (error) => {
        console.error("Mint Failed", error);
        handleNotification("error", 'NFT Mint is failed');
        dispatch(apiAction.setLoading(false))
    }

    const mintNFT = (boxId) => {
        dispatch(apiAction.mintNFT(boxId, web3Instance, nftContractInstance, address, onMintSuccess, onMintFail));
    }

    const setWhitelistMode = () => {
        dispatch(apiAction.setWhitelistMode(nftContractInstance, address, true));
    }
    return (
        <Container>
            <Header handleNotification={handleNotification}/>
            <Row>
                <CustomButton text={'Box1'} isLoading={false} onClick={() => {mintNFT(1)}} disabled={false} />
                <CustomButton text={'Box2'} isLoading={false} onClick={() => {mintNFT(2)}} disabled={false} />
                <CustomButton text={'Box3'} isLoading={false} onClick={() => {mintNFT(3)}} disabled={false} />

                {/* admin */}
                <CustomButton text={'whitelist'} onClick={() => {setWhitelistMode()}} disabled={false} />
            </Row>
            <CustomModal show={isModalShow} data={nftData} handleClose={() => {
                setModalShow(false);
            }}/>
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

