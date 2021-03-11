import React from 'react'
import {Modal, Button, Container, Row, Col, Card, FormControl, InputGroup} from 'react-bootstrap';
import CoustomAdvDesigner from '../customAdvDesign'

// Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'

export function MyVerticallyCenteredModal(props) {
  const [text,setText] = React.useState(false);

    const styles = {
        width: 300,
        marginTop: "1em",
        marginBottom: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    };

    function editButton(){
      if(props.data.texts !== ""){
        return(<Row>
          <Col>
            <div className="columns" >
              <Button className="homeButton" variant="outline-primary" onClick={()=>{setText(true)}} title='Text, Colors'>Edit{" "}<FontAwesomeIcon icon={faDice} /></Button>
              <CoustomAdvDesigner show={text} closes={()=>{setText(false)}} />
            </div>
          </Col>
        </Row>)
      }
    }

  function customPreview(){
    if(props.data.size){
      return(
        <div>
            <Row>
              <div className="columns" style={styles} >
                <Col>
                  <InputGroup className="mb-1" size="md">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{" "} X {" "}</InputGroup.Text>
                      </InputGroup.Prepend>
                    <FormControl maxLength="5" placeholder={ (Math.round(props.position.x * 100) / 100).toFixed(2) } onChange={(e)=> {props.x( Number(e.target.value) )}}/>
                      <InputGroup.Prepend>
                        <InputGroup.Text>{" "} Y {" "}</InputGroup.Text>
                      </InputGroup.Prepend>
                    <FormControl maxLength="5" placeholder={ (Math.round(props.position.y * 100) / 100).toFixed(2) } onChange={(e)=> {props.y( Number(e.target.value) )}}/>
                  </InputGroup>
                </Col>
              </div>
            </Row>
            <Row>
              <div className="columns"  style={styles} >
                <Col>
                  <InputGroup className="mb-1" size="md">
                      <InputGroup.Prepend>
                        <InputGroup.Text>{" "} W {" "}</InputGroup.Text>
                      </InputGroup.Prepend>
                    <FormControl maxLength="5" placeholder={ (Math.round(props.pixels.width * 100) / 100).toFixed(2) } onChange={(e) => {props.width(Number(e.target.value))}} />
                      <InputGroup.Prepend>
                        <InputGroup.Text>{" "} H {" "}</InputGroup.Text>
                      </InputGroup.Prepend>
                    <FormControl maxLength="5"  placeholder={ (Math.round(props.pixels.height * 100) / 100).toFixed(2) } onChange={(e) => {props.height(Number(e.target.value))}} />
                  </InputGroup>
                </Col>
              </div>
          </Row>
        </div>
        )
    }
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
          Select Your Input
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
          {editButton()}
          {customPreview()}
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="homeButton" variant="outline-primary" onClick={props.sender}>Send</Button>
        <Button className="homeButton" variant="outline-danger" onClick={props.setShows}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function Carder({img}){

  return(
    <Card>
        <Card.Img variant="center" src={img}/>
    </Card>
  )
}
