import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MintHeader from '../components/MintHeader';
import { getBurgers } from '../lib/nftutils';
import { formatNo } from '../lib/utilities';
import { getAddress, getNFTContractInstance, getProvider, getWeb3Instance } from '../store/reducers';
const Home = ({ handleNotification }) => {
    const address = useSelector(state => getAddress(state));
    const web3Instance = useSelector(state => getWeb3Instance(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const provider = useSelector(state => getProvider(state));
    const [burgerList, setBurgerList] = useState([]); 
    useEffect( () => {
        if (provider) {
            (async() => {
                let burgers = await getBurgers(nftContractInstance, address);
                console.log('burgers: ', burgers);
                setBurgerList(burgers);
            })()
        }
    }, [provider]);
    
    return (
        <Container>
            <MintHeader handleNotification={handleNotification}/>
            <ItemList>
                {
                    burgerList && burgerList.map((data, index) => (
                        <BurgerItem key={index}>
                            <DIV>
                                <Img src={data.image} />
                                <INFO>
                                    <INFO_ITEM>
                                        <h2> {'POWER:  '} </h2>
                                        <h3>{new Intl.NumberFormat().format(data.price)}</h3>
                                    </INFO_ITEM>
                                    <INFO_BUTTON>
                                        MARKETPLACE
                                    </INFO_BUTTON>
                                </INFO>
                                <FLEXDIV>
                                    {
                                        data.attributes && data.attributes.map((attr, index) => (
                                            <ITEM key={index}>
                                                <img src={`/images/ingredients/${attr.trait_type.toLowerCase()}/${attr.rarity_id}.png`} alt="img" />
                                                <div className="rarity-info">
                                                    <label htmlFor="">{attr.name}</label>
                                                    <label htmlFor="">
                                                        <span className="rarity-name">{attr.rarity}: {' '} </span>
                                                        <span className="rarity-value">{attr.value}</span>
                                                    </label>
                                                </div>
                                            </ITEM>
                                        ))
                                    }

                                </FLEXDIV>
                                <SPAN>#{formatNo(data.tokenId)}</SPAN>
                                <CookButton>lets cook!</CookButton>
                            </DIV>
                        </BurgerItem>
                    ))
                }
            </ItemList>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    flex-direction: column;
`
const ItemList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
`;
const BurgerItem = styled.li`
    display: flex;
    width: 40%;
    min-width: 450px;
`;

const DIV = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
    background: white;
    border-radius: 20px;
    position: relative;
    box-sizing: border-box;
  
    $border: 5px;
    background-clip: padding-box; /* !importanté */
    border: solid $border transparent; /* !importanté */
    border-radius: 1em;
  
    &:before {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      z-index: -1;
      margin: -$border; /* !importanté */
      border-radius: inherit; /* !importanté */
      background: linear-gradient(to right, red, orange);
    }
  `;

const Img = styled.img`
    width: 140px;
    display: block;
  `;

const INFO = styled.div`
    width: 100%;
    display: flex;
    height: fit-content;
    justify-content: space-between;
    margin-bottom: 10px;
  `;

const INFO_ITEM = styled.div`
    width: fit-content;
    display: flex;
    h2 {
        color: #27dc27;
        margin: 0;
        font-size: 24px;
        font-weight: bold;
    }
    h3 {
        color: black;
        margin: 0;
        font-size: 24px;
        font-weight: bold;
    }
  `;
const INFO_BUTTON = styled.button`
    width: fit-content;
    padding: 5px 10px;
    color: green;
    outline: nonoe;
    border-radius: 10px;
    border-color: #27dc27;
  `;

const FLEXDIV = styled.div`
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
  `;
const ITEM = styled.div`
    width: 40%;
    height: fit-content;
    display: flex;
    img {
        width: auto;
        height: 60px;
        display: block;
    }
    div {
        display: flex;
        width: fit-content;
        flex-direction: column;
        text-transform: uppercase;
        font-weight: bold;
        label {
            font-size: 16px;
            color: black;
            span.rarity-name {
                color: #d69718;
            }
            span.rarity-value {
                color: black;
            }
        }

    }
  `;
const SPAN = styled.span`
    position: absolute;
    top: 5px;
    left: 20px;
    font-size: 16px;
    color: black;
    font-weight: 500;
  `

const CLOSE = styled.span`
    position: absolute;
    top: -15px;
    right: 0px;
    font-size: 24px;
    color: black;
    font-weight: 500;
    cursor: pointer;
  `;

const CookButton = styled.button`
    width: 100%;
    height: 36px;
    color: #1245c5b5;
    border-radius: 6px;
    outline: none;
    border: none;
    box-shadow: 0px 0px 3px 0px blue;
    text-transform: uppercase;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4e97e9;
    font-weight: 900;
    margin-top: 15px;
  `;
export default Home;