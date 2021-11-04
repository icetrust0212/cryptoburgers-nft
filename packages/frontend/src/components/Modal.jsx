import {Button, Modal} from 'react-bootstrap';
import styled from 'styled-components';

function CustomModal({show, handleClose, data}) {
  
    return (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <DIV>
                <Img src={data.image} />
                <INFO>
                    <INFO_ITEM>
                        <h2>POWER: </h2>
                        <h3>16.78</h3>
                    </INFO_ITEM>
                    <INFO_BUTTON>
                        MARKETPLACE
                    </INFO_BUTTON>
                </INFO>
                <FLEXDIV>
                    {
                        data.attributes && data.attributes.map(attr => (
                            <ITEM>
                                <img src={`/images/ingredients/${attr.trait_type.toLowerCase()}/${attr.rarity_id}.png`} alt="img" />
                                <div className="rarity-info">
                                    <label htmlFor="">{attr.name}</label>
                                    <label htmlFor="">
                                        <span className="rarity-name">{attr.rarity}:</span>
                                        <span className="rarity-value">{attr.value}</span>
                                    </label>
                                </div>
                            </ITEM>
                        ))
                    }
                    
                </FLEXDIV>
            </DIV>
          </Modal.Body>
        </Modal>
    );
  }

  const DIV = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  `;

  const Img = styled.img`
    width: 250px;
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
    }
    h3 {
        color: black;
        margin: 0;
        font-size: 24px;
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
    width: fit-content;
    height: 60px;
    display: flex;
    img {
        width: auto;
        height: 100%;
        display: block;
    }
    div {
        display: flex;
        width: 140px;
        flex-direction: column;
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
  `
  
  export default CustomModal;