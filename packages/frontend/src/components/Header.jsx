import styled from 'styled-components'
import ConnectButton from './ConnectButton';
import logoImg from '../assets/imgs/logo.svg';
import tableImg from '../assets/imgs/menu_table.png';
import menuHome from '../assets/imgs/menu_home.png';
import menuMint from '../assets/imgs/menu_mint.png';
import menuStaking from '../assets/imgs/menu_staking.png';
import menuMarket from '../assets/imgs/menu_marketplace.png';
import menuAccount from '../assets/imgs/menu_account.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAddress, getProvider, getTokenList } from '../store/reducers';
import { ellipseAddress } from '../lib/utilities';

const Header = () => {
    const tokenList = useSelector(state => getTokenList(state));
    const address = useSelector(state => getAddress(state));
    const provider = useSelector(state => getProvider(state));
    return (
        // <ConnectButton />
        <HeaderWrapper className="header-wrapper">
            <Link to={'/'}>
                <LogoImg src={logoImg} alt="logo" className="logo" />
            </Link>
            <Menu>
                <TableImg src={tableImg} alt="table" className="table-img" />
                <MenuItem>
                    <Link to={'/'}>
                        <img src={menuHome} alt="home" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={`/mint`}>
                        <img src={menuMint} alt="mint" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={`/marketplace`}>
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
                <AccountPlaceHolder src={menuAccount} alt="account-background" className="account-background" />
                <div className="account-info">
                    {
                        provider && (
                            <>
                                <TokenCount>{tokenList.length}</TokenCount>
                                <AccountAddress>{ellipseAddress(address)}</AccountAddress>
                            </>
                        )
                    }
                    <ConnectButton />
                </div>
            </AccountInfo>
        </HeaderWrapper>

    )
}

const HeaderWrapper = styled.div`
    width: 100%;
    height: 150px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    --marginTop: 50px;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 10;
    font-family: 'Baloo';
`;

const LogoImg = styled.img`
    width: 150px;
    margin-top: var(--marginTop);
`;
const Menu = styled.div`
    width: 0;
    max-width: 1000px;
    min-width: 420px;
    min-height: 50px;
    flex: 1;
    height: 5vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    margin: calc(var(--marginTop) - 10px) 60px 0 60px;
`;
const TableImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 20px;
`;
const AccountInfo = styled.div`
    height: 100%;
    width: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    span {
        display: flex;
        height: 25px;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        padding-top: 3px;
    }
    .account-info {
        padding-top: 25px;
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-transform: uppercase;
    }
`;

const AccountPlaceHolder = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
`;

const MenuItem = styled.div`
    height: 100%;
    width: 20%;
    max-width: 200px;
    display: flex;
    z-index: 1;
    margin-bottom: 30px;
    align-items: flex-bottom;
    justify-content: center;
    cursor: pointer;
    &:hover {
        padding: 2px;
    }
    img {
        width: 100%;
        display: flex;
    }
    &.staking {
        padding-top: 10px;
        width: 25%;
        max-width: 250px;
    }
    a {
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    @media(min-width: 1300px) {
        margin-bottom: 45px;
    }
    @media(min-width: 1399px) {
        margin-bottom: 80px;
    }
    @media(min-width: 1400px) and (max-width: 1700px) {
        margin-bottom: 60px;
    }
    @media(max-width: 991px) {
        width: 83px;
        margin-bottom: 30px;
    }
`;

const TokenCount = styled.span`
    color: #444444;
`;
const AccountAddress = styled.span`
    color: #555555;
`;
export default Header;