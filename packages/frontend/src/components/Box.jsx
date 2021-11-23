import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import boxPanel1 from '../assets/imgs/boxPanel_temp1.png';
import boxPanel2 from '../assets/imgs/boxPanel_temp2.png';
import boxPanel3 from '../assets/imgs/boxPanel_temp3.png';

import memo1 from '../assets/imgs/memo1.png';
import memo2 from '../assets/imgs/memo2.png';
import memo3 from '../assets/imgs/memo3.png';
import { getBoxPrice } from '../lib/nftutils';
import { getNFTContractInstance, getProvider } from '../store/reducers';

const Box = ({ networkEnable, boxId, onPurchase, title, currentTokenAmount, limitTokenAmount, priceType }) => {
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const provider = useSelector(state => getProvider(state));
    const [price, setPrice] = useState(0);
    const [mintable, setMintable] = useState(networkEnable && (currentTokenAmount < limitTokenAmount));

    useEffect(() => {
        if (provider) {
            (async () => {
                let _boxPrice = await getBoxPrice(nftContractInstance, boxId, priceType);
                setPrice(_boxPrice);
            })();
        }
    }, [provider]);

    const getBoxPanel = (boxId) => {
        switch (boxId) {
            case 0:
                return boxPanel1;
            case 1:
                return boxPanel2;
            case 2:
                return boxPanel3;
        }
    }

    const getMemo = (boxId) => {
        switch (boxId) {
            case 0:
                return memo1;
            case 1:
                return memo2;
            case 2:
                return memo3;
        }
    }


    const getColor = (boxId) => {
        switch (boxId) {
            case 0:
                return "#1d6516" ;
            case 1:
                return "#164a65";
            case 2:
                return "#651623";
        }
    }
    const getOffset = (direction, boxId) => {
        const isMobile = window.innerWidth < 768 ;

        if (direction === 'left') {
            switch (boxId) {
                case 0:
                    return isMobile ? "61px": "3.3vw" ;
                case 1:
                    return isMobile ? "138px": "8.4vw" ;
                case 2:
                    return isMobile ? "61px": "3.4vw" ;
            }
        } else {
            switch (boxId) {
                case 0:
                    return isMobile ? "31px": "1vw" ;
                case 1:
                    return isMobile ? "31px": "1vw" ;
                case 2:
                    return isMobile ? "34px": "0.7vw" ;
            }
        }
    }
    return (
        <Wrapper className="box-wrapper">
            <Panel src={getBoxPanel(boxId)} alt="panel" className="box-panel" />
            <Counter className="counter-layout">
                <img src="/images/bg_counter.png" alt="" className="counter-bg" />
                <span htmlFor="" className="counter">
                    {
                        currentTokenAmount < limitTokenAmount ? (
                            <>
                                <span className="number">{currentTokenAmount}</span>
                                <span className="slash">/</span>
                                <span className="number">{limitTokenAmount}</span>
                            </>
                        ) : (
                            <span className="slash">Sold Out!</span>
                        )
                    }
                    
                </span>
            </Counter>
            <Content>
                <Title>{title}</Title>
                <Price style={{color: getColor(boxId)}}>{price / Math.pow(10, 18)}{priceType}</Price>
                <ButtonPurchase
                    className="btn-text" 
                    onClick={() => {
                        if (mintable) {
                            onPurchase();
                        }
                    }} 
                    style={{  
                        left: getOffset('left', boxId),
                        bottom: getOffset('bottom', boxId),
                        filter: !mintable ? 'grayscale(1)' : ''
                    }}>
                        <img src={getMemo(boxId)} className="bg_purchase" />
                        <span style={{transform: boxId === 2 ? 'rotate(5deg)' : 'rotate(-5deg)'}}>buy</span>
                </ButtonPurchase>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 20%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: Baloo;
    margin: 0 3.5vw;
    @media(max-width: 767px) {
        width: 300px;
        margin-top: 100px;
    }
`;

const Panel = styled.img`
    width: 100%;
`;
const Counter = styled.div`
    position: absolute;
    top: -70px;
    left: 0;
    width: 100%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    img {
        width: 80%;
        z-index: -1;
    }
    span.counter {
        
        position: absolute;
        left: 0;
        top: 0;
        font-size: 2vw;
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .number {
            color: #642f2f;
        }
        .slash {
            color: #ff3c1e;
        }
        @media(max-width: 767px) {
            font-size: 30px;
        }
    }
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 27%; 
    @media(max-width: 767px) {
        padding-top: 82px;
    }
`;
const Title = styled.label`
    font-size: 2vw;
    color: black;
    font-weight: normal;
    text-align: center;
    @media(max-width: 767px) {
        font-size: 27px;
    }
`;

const Price = styled.span`
    font-size: 2vw;
    margin-top: 2%;
    margin-right: 2%;
    @media(max-width: 767px) {
        font-size: 27px;
        margin-top: 10px;
        margin-right: 5px;
    }
`;
const ButtonPurchase = styled.div`
    cursor: pointer;
    bottom: 1vw;
    padding: 8%;
    text-transform: capitalize;
    font-size: 2.4vw;
    font-weight: normal;
    z-index: 1;
    color: var(--button-text-color);
    position: relative;
    .bg_purchase {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    span {
        display: block;
    }
    :hover {
        font-size: 2.6vw;
    }
    position: absolute;
    @media(max-width: 767px) {
        bottom: 20px !important;
        padding: 25px;
        font-size: 30px;
        :hover {
            font-size: 34px;
            margin-left: 0px;
        }
    }
`;

export default Box;