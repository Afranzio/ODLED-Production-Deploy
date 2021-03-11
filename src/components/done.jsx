import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import { ProgressSpinner } from 'primereact/progressspinner';

// Style
import 'primereact/resources/primereact.min.css';


export default function Done(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{width: "40%", marginLeft: "30%"}}
        className="alert"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong style={{font: "'Quicksand', sans-serif"}} >Please Wait. "Uploading Your File "</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display: "flex"}}>
            <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="5" fill="#FFFFFF" animationDuration="0.8s" />
        </Modal.Body>
      </Modal>
    );
}
