import styled from 'styled-components';
import boxPanel1 from '../assets/imgs/boxPanel1.png';
import boxPanel2 from '../assets/imgs/boxPanel2.png';
import boxPanel3 from '../assets/imgs/boxPanel3.png';
const imgPath = '../assets/imgs/';

const Box = ({ boxId, onPurchase, price, title }) => {
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
                    return isMobile ? "31px": "1.5vw" ;
                case 1:
                    return isMobile ? "31px": "1.5vw" ;
                case 2:
                    return isMobile ? "34px": "1.9vw" ;
            }
        }
    }
    return (
        <Wrapper className="box-wrapper">
            <Panel src={getBoxPanel(boxId)} alt="panel" className="box-panel" />
            <Content>
                <Title>{title}</Title>
                <Price style={{color: getColor(boxId)}}>{price}BNB</Price>
                <ButtonPurchase
                    className="btn-text" 
                    onClick={onPurchase} 
                    style={{ 
                        transform: boxId === 2 ? 'rotate(5deg)' : 'rotate(-5deg)', 
                        left: getOffset('left', boxId),
                        bottom: getOffset('bottom', boxId),
                    }}>
                        buy
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
    }
`;

const Panel = styled.img`
    width: 100%;
`;
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
    padding: 4%;
    text-transform: capitalize;
    font-size: 2.8vw;
    font-weight: normal;
    color: var(--button-text-color);
    :hover {
        font-size: 3vw;
    }
    position: absolute;
    @media(max-width: 767px) {
        bottom: 20px;
        padding: 10px;
        font-size: 30px;
        :hover {
            font-size: 34px;
            margin-left: 0px;
        }
    }
`;

export default Box;