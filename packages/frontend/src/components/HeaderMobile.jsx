import { useRef, useState } from 'react';
import triggerImage from '../assets/imgs/mobile/trigger.png';
import panelImage from '../assets/imgs/mobile/mobile_panel.png';
import homeImage from '../assets/imgs/mobile/menu_mobile_home.png';
import mintImage from '../assets/imgs/mobile/menu_mobile_mint.png';
import marketplaceImage from '../assets/imgs/mobile/menu_mobile_marketplace.png';
import stakingImage from '../assets/imgs/mobile/menu_mobile_staking.png';
import ConnectButton from './ConnectButton';
import { useSelector } from 'react-redux';
import { getAddress, getProvider } from '../store/reducers';
import { Link } from 'react-router-dom';
import logoImg from '../assets/imgs/logo.svg';

import styled from 'styled-components';
import { ellipseAddress } from '../lib/utilities';

const HeaderMobile = (props) => {
    const [isExpand, setExpand] = useState(false);
    const address = useSelector(state => getAddress(state));
    const provider = useSelector(state => getProvider(state));

    const handleTriggerClick = (e) => {
        setExpand(true);
        e.preventDefault();
        e.stopPropagation();
        console.log('trigger;', isExpand);
    }
    const handleCollapse = () => {
        setExpand(false);
    }

    return (
        <Container className={isExpand ? 'expand' : ''} onClick={handleCollapse}>
            <Header>
                <Link to={'/'}>
                    <LogoImg src={logoImg} alt="logo" className="logo" />
                </Link>
                <Trigger src={triggerImage} onClick={handleTriggerClick} />
            </Header>
            <Wrapper className="menu-panel" onClick={e => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <Panel src={panelImage} />
                <MenuLayout>
                    <Menu>
                        <Link to={`/`}>
                            <MenuItem src={homeImage}></MenuItem>
                        </Link>
                        <Link to={`/mint`}>
                            <MenuItem src={mintImage}></MenuItem>
                        </Link>
                        <Link to={`/marketplace`}>
                            <MenuItem src={marketplaceImage}></MenuItem>
                        </Link>
                        <Link to={`/staking`}>
                            <MenuItem src={stakingImage}></MenuItem>
                        </Link>
                    </Menu>
                    <ConnectionInfo>
                        <ConnectButton color={'white'} />
                        {
                            provider && address &&
                            <span className="address-view">{ellipseAddress(address)}</span>
                        }
                    </ConnectionInfo>
                </MenuLayout>

            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: fit-content;
    transition: background 0.5s;
    &.expand {
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.7);
        .menu-panel {
            max-width: 80vw;
        }
    }
    
`;

const Header = styled.div`
    width: 100%;
    height: fit-content;
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 20px;
`

const LogoImg = styled.img`
    width: 130px;
    &:hover {
        padding: 10px;
    }
`;

const Trigger = styled.img`
    width: 8vw;
    height: 8vw;
    min-width: 70px;
    min-height: 70px;
    &:hover {
        padding: 5px;
    }
    cursor: pointer;
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1px;
    height: 100vh;
    position: absolute;
    background: transparent;
    transition: all 0.5s;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 10;
`;

const Panel = styled.img`
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: -1;
`;

const MenuLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-end;
    justify-content: space-around;
    padding-top: 30px;
`;

const Menu = styled.div`
    width: 100%;
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-end;
    justify-content: space-around;
    margin-right: -10px;
    
`;

const MenuItem = styled.img`
    height: 90px;
    &:hover {
        padding: 3px;
    }
`
const ConnectionInfo = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 0;
    .address-view {
        font-size: 23px;
    display: block;
    padding: 3px 10px;
    border-radius: 28px;
    background: white;
    color: black;
    font-family: 'Baloo';
    }
`
export default HeaderMobile;