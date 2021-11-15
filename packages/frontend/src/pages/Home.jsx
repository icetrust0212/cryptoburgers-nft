import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import styled from 'styled-components';

import { getAddress, getNFTContractInstance, getProvider, getTokenList, getWeb3Instance } from '../store/reducers';
import { apiAction } from '../store/actions';
import BurgerCard from '../components/BurgerCard';
const Home = ({ handleNotification }) => {
    const address = useSelector(state => getAddress(state));
    const web3Instance = useSelector(state => getWeb3Instance(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const provider = useSelector(state => getProvider(state));
    const burgerList = useSelector(state => getTokenList(state));
    const dispatch = useDispatch();
    
    useEffect( () => {
        if (provider) {
            console.log('provider: ', provider);
            dispatch(apiAction.getTokensPerAddress(nftContractInstance, address));
        }
    }, [provider, address]);
    
    return (
        <Container>
            <Header handleNotification={handleNotification}/>
            <ContentContainer>
                <ItemList>
                {
                    burgerList && burgerList.map((data, index) => (
                        <BurgerCard data={data} key={index}/>
                    ))
                }
            </ItemList>
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: fit-contnet;
    min-height: 100vh;
    background-repeat-x: no-repeat;
    background-size: 100%;
    background-image: url(/images/home_burgers_background.svg);
    background-repeat-y: repeat;
`
const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;    
`;
const ItemList = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    align-items: flex-start;
    @media(max-width: 991px) {
        justify-content: center;
    }
    z-index: 1;
    width: fit-content;
    max-width: 900px;
`;


export default Home;