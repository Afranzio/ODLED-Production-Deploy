import React from 'react';
import {Modal, Button, Container} from 'react-bootstrap';
import { Editor } from 'primereact/editor';


export default function CustomTextDesigner(props){

    function sender(){
        props.sendit()
        props.closes()
    }

    return (
        <div className="App">
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
                        <Editor style={{height:'320px'}} value={props.value} onTextChange={(e) => props.setvalue(e.htmlValue)}/>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="homeButton" variant="outline-primary" onClick={sender}>Send</Button>
                    <Button className="homeButton" variant="outline-danger" onClick={props.closes}>Close</Button>
                </Modal.Footer>
                </Modal>
        </div>
    );
}