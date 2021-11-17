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
                    return isMobile ? "61px": "5vw" ;
                case 1:
                    return isMobile ? "140px": "13vw" ;
                case 2:
                    return isMobile ? "61px": "5vw" ;
            }
        } else {
            switch (boxId) {
                case 0:
                    return isMobile ? "31px": "2.3vw" ;
                case 1:
                    return isMobile ? "31px": "2.3vw" ;
                case 2:
                    return isMobile ? "34px": "3vw" ;
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
    width: 30%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: Baloo;
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
    padding-top: 29%; 
    @media(max-width: 767px) {
        padding-top: 82px;
    }
`;
const Title = styled.label`
    font-size: 2.3vw;
    color: black;
    font-weight: normal;
    text-align: center;
    @media(max-width: 767px) {
        font-size: 27px;
    }
`;

const Price = styled.span`
    font-size: 2.3vw;
    margin-top: 5%;
    margin-right: 2%;
    @media(max-width: 767px) {
        font-size: 27px;
        margin-top: 10px;
        margin-right: 5px;
    }
`;
const ButtonPurchase = styled.div`
    cursor: pointer;
    bottom: 2vw;
    padding: 5%;
    text-transform: capitalize;
    font-size: 3.4vw;
    font-weight: normal;
    color: var(--button-text-color);
    :hover {
        font-size: 4vw;
        margin-left: -0.6vw;
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