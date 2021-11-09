import {Button, Modal} from 'react-bootstrap';
import styled from 'styled-components';
import "../assets/scss/modal.scss";
import { formatNo } from '../lib/utilities';

function CustomModal({show, handleClose, data}) {
  
    return (
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
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
                <CLOSE onClick={handleClose}>x</CLOSE>
                <CookButton>lets cook!</CookButton>
            </DIV>
          </Modal.Body>
        </Modal>
    );
  }

  const DIV = styled.div`
    max-width: 400px;
    min-height: 500px;
    @media(max-width: 567px) {
        min-height: fit-content;
        width: 300px;
    }
    font-family: 'American';
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
    border-radius: 20px;
    background: white;
    position: relative;
    box-sizing: border-box;
    background-clip: padding-box; /* !importanté */
    border: solid 2px transparent; /* !importanté */
    border-radius: 1em;
  
    &:after {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      margin: -5px; /* !importanté */
      border-radius: inherit; /* !importanté */
      background: linear-gradient(to right, red, orange);
      z-index: -1;
    }
  `;

const Img = styled.img`
    width: 140px;
    @media(max-width: 567px) {
        width: 100px;
    }
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
    align-items: center;
    h2, h3 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        @media(max-width: 567px) {
            font-size: 16px;
        }
    }
    h2 {
        color: #27dc27;
    }
    h3 {
        color: black;
    }
  `;
const INFO_BUTTON = styled.button`
    width: fit-content;
    padding: 5px 10px;
    color: green;
    outline: nonoe;
    border-radius: 10px;
    border-color: #27dc27;
    @media(max-width: 567px) {
        font-size: 14px;
        padding: 2px 5px;
    }
  `;

const FLEXDIV = styled.div`
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
  `;
const ITEM = styled.div`
    width: 160px;
    @media(max-width: 567px) {
        width: 100px;
    }
    height: fit-content;
    display: flex;
    img {
        width: auto;
        height: 60px;
        display: block;
        @media(max-width: 567px) {
            height: 30px;
        }
    }
    div {
        display: flex;
        width: fit-content;
        flex-direction: column;
        text-transform: uppercase;
        font-weight: bold;
        label {
            font-size: 16px;
            @media(max-width: 567px) {
                font-size: 12px;
            }
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
    margin-top: auto;
    @media(max-width: 567px) {
        font-size: 16px;
        margin-top: 15px;
    }
  `;

  const CLOSE = styled.span`
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 24px;
    color: black;
    font-weight: 500;
    cursor: pointer;
  `;

  export default CustomModal;