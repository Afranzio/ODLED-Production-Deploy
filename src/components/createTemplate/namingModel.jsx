import React from 'react'
import {Modal, Button, Container, Row, Col, FormControl, InputGroup} from 'react-bootstrap';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter unique name for your template.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        <Row>
            <Col>
              <InputGroup className="mb-1" size="md">
                  <FormControl placeholder="Enter A Unique Name" onChange={(e) => {props.tempName(e.target.value)}} />
              </InputGroup>
            </Col>
        </Row>
      </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="homeButton" variant="outline-primary" onClick={props.runUpload}  >Send</Button>
        <Button className="homeButton" variant="outline-danger" onClick={props.setShows}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
