import React from 'react'
import {Button,Row, Col, Modal} from 'react-bootstrap'

// Template PNG
import Temp1 from '../asset/template/Temp1.png'
import Temp2 from '../asset/template/Temp2.png'
import Temp3 from '../asset/template/Temp3.png'
import Temp4 from '../asset/template/Temp4.png'
import Temp5 from '../asset/template/Temp5.png'
import Temp6 from '../asset/template/Temp6.png'


export default function Template({tmp, setTmp, setNow, tempNum, data}) {

    function handleSend(value){
      tempNum(value)
      setNow(value)
      setTmp(false)
    }

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="templateModal"
          >
            <Modal.Header closeButton style={{backgroundColor: "rgb(128,128,128,0.7)", fontWeight: "800" }} >
              <Modal.Title id="contained-modal-title-vcenter">
                Select a Template
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "rgb(128,128,128,0.7)"}} >
              <Row className="templateRow" >
                <Col><img src={Temp1}  alt="Temp1" className="templateImage"  id='0' onClick={(e)=>{handleSend(e.target.id)}} /></Col>
                <Col><img src={Temp2} alt="Temp2"  className="templateImage" id='1' onClick={(e)=>{handleSend(e.target.id)}} /></Col>
                <Col><img src={Temp3} alt="Temp3"  className="templateImage" id='2' onClick={(e)=>{handleSend(e.target.id)}} /></Col>
              </Row>             
             <Row className="templateRow" >
                <Col><img src={Temp4} alt="Temp4" className="templateImage" id='3' onClick={(e)=>{handleSend(e.target.id)}} /></Col>
                <Col><img src={Temp5} alt="Temp5" className="templateImage" id='4' onClick={(e)=>{handleSend(e.target.id)}} /></Col>
                <Col><img src={Temp6} alt="Temp6" className="templateImage" id='5' onClick={(e)=>{handleSend(e.target.id)}} /></Col>
              </Row>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: "rgb(128,128,128,0.7)"}}>
              <Button className="homeButton" varient='btn-outline' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    return (
        <div>
            <MyVerticallyCenteredModal
                show={tmp}
                onHide={() => setTmp(false)}
            />
        </div>
    )
}
