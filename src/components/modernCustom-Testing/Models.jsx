import React from 'react'
import {Modal, Button, Container, Row, Col, Card, FormControl, InputGroup} from 'react-bootstrap';
import CoustomAdvDesigner from '../customAdvDesign'

// Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice, faPlus, faTable } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'

// Loading Content
import Done from '../done';

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
            <div className="columns" style={styles} >
              <Row>
               <Col>
                  <div className="columns" >
                    <label className="custom-file-upload" style={{borderRadius: "5px"}} title='Images, Videos'>
                      {
                        props.data.fileType === "image/png" || props.data.fileType === "image/PNG" || props.data.fileType === "image/jpeg" || props.data.fileType === "image/jpg" || props.data.fileType === "image/gif" ? 
                        <input type="file" style={{display: "none"}} accept="image/*" onChange={(e) => {props.MaP(e,props.data)}} />:
                        <input type="file" style={{display: "none"}} accept="video/*" onChange={(e) => {props.MaP(e,props.data)}} />
                      }
                      <FontAwesomeIcon icon={faPlus} />
                      <strong style={{marginLeft: "5px"}}>Add File</strong>
                    </label>
                  </div>
                </Col>
                {
                  props.data.fileType === "image/png" || props.data.fileType === "image/PNG" || props.data.fileType === "image/jpeg" || props.data.fileType === "image/jpg" || props.data.fileType === "image/gif" ? 
                  <div>
                    <Col>
                      <InputGroup className="mb-1" size="md"> 
                        <FormControl maxLength="5" placeholder="interval" onChange={(e) => {props.SIP(e.target.value, props.data)}} />
                        <InputGroup.Prepend>
                            <InputGroup.Text>{" "} Sec {" "}</InputGroup.Text>
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Col>
                    <Row>
                      <Col>
                        <InputGroup className="mb-1" size="md"> 
                          <FormControl maxLength="5" placeholder="interval" onChange={(e) => {props.SIT(e.target.value, props.data)}} />
                          <InputGroup.Prepend>
                              <InputGroup.Text>{" "} Trans {" "}</InputGroup.Text>
                          </InputGroup.Prepend>
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup className="mb-1" size="md"> 
                          <select class="form-control" id="axis" formControlName="axis" onChange={(e) => {props.SIA(e.target.value, props.data)}} >
                                  <option value="horizontal">Horizontal</option>
                                  <option value="vertical" >Vertical</option>
                          </select> 
                          <InputGroup.Prepend>
                              <InputGroup.Text>{" "} Axis {" "}</InputGroup.Text>
                          </InputGroup.Prepend>
                        </InputGroup>
                      </Col>
                    </Row>
                  </div>
                  : null
                }
              </Row>
            </div>
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
    <div>
      <Done show={props.doing} onHide={() => props.setDoing(false)} />
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
    </div>
  );
}

export function Carder({img}){

  return(
    <Card>
        <Card.Img variant="center" src={img}/>
    </Card>
  )
}
