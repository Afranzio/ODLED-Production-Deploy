import React from 'react'
import {Modal, Button, Container, Row, Col, FormControl, InputGroup} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'

import {db} from '../../secure/firebase';

export function MyVerticallyCenteredModal(props) {

  const [drag, setDrag] = React.useState({
    x: "",
    y: ""
  })

  const [size, setSize] = React.useState({
    w: "",
    h: ""
  })

    const styles = {
        width: 300,
        marginTop: "1em",
        marginBottom: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    };

  
  function updateCustomDrag(x,y){
    db.collection(props.accName).doc(props.ids).update({
        position:{
            x: x,
            y: y
        }
    })
  }

  function updateCustomSize(w,h){
    db.collection(props.accName).doc(props.ids).update({
        size:{
            width: w,
            height: h
        }
    })
  }

  function sendIt(){
    updateCustomDrag(drag.x, drag.y)
    updateCustomSize(size.w, size.h)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Box Position
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <Row>
            <div className="columns"  style={styles} >
              <Col>
                <InputGroup className="mb-1" size="md">
                  <FormControl maxLength="5" placeholder="Left" onChange = {(e)=>{setDrag({...drag,y: Number(e.target.value)})}} />
                  <InputGroup.Prepend>
                    <InputGroup.Text>{" "} X {" "}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl maxLength="5" placeholder="Top" onChange = {(e)=>{setDrag({...drag,x: Number(e.target.value)})}} />
                </InputGroup>
              </Col>
            </div>
        </Row>
        <Row>
            <div className="columns"  style={styles} >
              <Col>
                <InputGroup className="mb-1" size="md">
                    <FormControl maxLength="5" placeholder="Width" onChange = {(e)=>{setSize({...size,w: Number(e.target.value)})}} />
                    <InputGroup.Prepend>
                      <InputGroup.Text>{" "} X {" "}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl maxLength="5" placeholder="Height" onChange = {(e)=>{setSize({...size,h: Number(e.target.value)})}} />
                </InputGroup>
              </Col>
            </div>
        </Row>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="homeButton" variant="outline-primary" onClick={sendIt}>Send</Button>
        <Button className="homeButton" variant="outline-danger" onClick={props.setShows}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
