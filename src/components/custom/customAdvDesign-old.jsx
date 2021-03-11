import React from 'react';
import {Modal, Button, Container} from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CoustomAdvDesigner(props){

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
                        <CKEditor
                            editor={ ClassicEditor }
                            data={props.value !== "" ? props.value : ""}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            }}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                props.setvalue(data)
                            }}
                            onBlur={ ( event, editor ) => {
                                // console.log( 'Blur.', editor );
                            }}
                            onFocus={ ( event, editor ) => {
                                // console.log( 'Focus.', editor );
                            }}
                        />
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