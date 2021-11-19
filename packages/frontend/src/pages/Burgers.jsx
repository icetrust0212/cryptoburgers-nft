import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import styled from 'styled-components';
import { getTokenList } from '../store/reducers';
import BurgerCard from '../components/BurgerCard';
const Burgers = ({ handleNotification }) => {
    
    const burgerList = useSelector(state => getTokenList(state));
    const dispatch = useDispatch();
    
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
    @media(max-width: 767px) {
        margin-top: 20px;
    }
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


export default Burgers;