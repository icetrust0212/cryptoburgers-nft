import styled from 'styled-components'
import ConnectButton from './ConnectButton';
import logoImg from '../assets/imgs/logo.png';
import menuHome from '../assets/imgs/menu_home_v2.png';
import menuBurgers from '../assets/imgs/menu_burgers_v2.png';
import menuStaking from '../assets/imgs/menu_staking_v2.png';
import menuMarket from '../assets/imgs/menu_marketplace_v2.png';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getNFTContractInstance, getProvider, getTokenList } from '../store/reducers';
import { ellipseAddress } from '../lib/utilities';
import ProgressBar from './ProgressBar';

const HeaderDesktop = () => {
    const tokenList = useSelector(state => getTokenList(state));
    const address = useSelector(state => getAddress(state));
    const provider = useSelector(state => getProvider(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const dispatch = useDispatch();
    // useEffect( () => {
    //     if (provider) {
    //         console.log('provider: ', provider);
    //         dispatch(apiAction.getTokensPerAddress(nftContractInstance, address));
    //     }
    // }, [provider, address]);

    return (
        // <ConnectButton />
        <HeaderWrapper className="header-wrapper">
            <Link to={'/'} className="logo-link">
                <LogoImg src={logoImg} alt="logo" className="logo" />
            </Link>
            <Menu>
                <MenuItem className="home">
                    <Link to={'/'}>
                        <img src={menuHome} alt="home" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="mint">
                    <Link to={`/burgers`}>
                        <img src={menuBurgers} alt="mint" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="marketplace">
                    <Link to={`/mint`}>
                        <img src={menuMarket} alt="marketplace" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="staking">
                    <Link to={`/staking`}>
                        <img src={menuStaking} alt="staking" className="menu-item-img" />
                    </Link>
                </MenuItem>
            </Menu>
            <AccountInfo>
                <div className="account-info">
                    {
                        <>
                            <Account>
                                {
                                    provider && address ?
                                    (
                                        <>
                                            <TokenCount>{tokenList.length}</TokenCount>
                                            <Divider />
                                        </>
                                    ) : ''
                                
                                }
                                <div>
                                    <ConnectButton />
                                </div>
                            </Account>
                            <Level>
                                <ProgressBar value={70} />
                            </Level>
                        </>
                    }
                </div>
            </AccountInfo>
        </HeaderWrapper>

    )
}

const HeaderWrapper = styled.div`
    width: 100%;
    height: 75px;
    padding: 0 7%;
    @media(max-width: 991px) {
        padding: 0 3%;
    }
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    font-family: 'Baloo';
    background-image: url('/images/bg_menu_v2.png');
    .logo-link {
        height: 100%;
        width: 10%;
    }
`;

const LogoImg = styled.img`
    padding: 5px;
    height: 100%;
    &:hover {
        padding: 2px;
    }
`;
const Menu = styled.div`
    width: 0;
    padding: 10px 30px;
    @media(max-width: 1200px) {
        padding: 15px 30px;
    }
    @media(max-width: 991px) {
        padding: 18px 30px;
    }
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 60%;
`;

const AccountInfo = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 200px;  
    width: 15%;
    z-index: 1;
    color: white;
    font-size: 14px;
    span {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .account-info {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-transform: uppercase;
    }
`;

const MenuItem = styled.div`
    height: 100%;
    max-width: 200px;
    width: 25%;
    display: flex;
    z-index: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 2px;
    @media(max-width: 991px) {
        width: auto;
    }
    a {
        height: 100%;
    }
    &:hover {
        padding: 0;
    }
    img {
        height: 100%;
        display: flex;
    }
    a {
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
`;

const Account = styled.div`
    display: flex;
    background-image: url('/images/bg_account.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 5px 20px 5px 30px;
    width: 100%;
    & > div {
        flex: 1;
        justify-content: center;
        align-items: center;
        display: flex;
    }
`;
const TokenCount = styled.span`
    width: 20%;
`;
const Level = styled.div`
    display: flex;
    width: 100%;
    height: 31px;
    padding: 10px 15px 10px 60px;
    background-image: url('/images/bg_level.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
`;
const Divider = styled.span`
    display: flex;
    width: 3px;
    height: 100%;
    background: white;
    margin-right: 10px;
`;
export default HeaderDesktop;