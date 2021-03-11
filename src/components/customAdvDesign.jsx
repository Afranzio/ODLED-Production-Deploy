import React,{useState} from 'react';
import {Modal, Button, Container} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default function CoustomAdvDesigner(props) {

  const [text, setText] = useState(props.valueText !== null && props.valueText !== undefined ? props.valueText.texts : "")

  function sender(){
    if(text !=="" || text !== null){
      if(props.valueText){
        props.updater(props.valueText, text)
        props.setcontext(null)
      }
      else{
        props.setvalue(text)
      }
    }
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
        </Modal.Header> 
        <Modal.Body>
            <Container>
              <SunEditor
                height="500"
                defaultValue={text !== "" ? text : "<p>Feel Free To Rewrite</p>"}
                name="display-editor" 
                onChange={(e) => {setText(e)}} 
                setOptions={{
                  buttonList:  [['font', 'fontSize', 'fontColor', 'hiliteColor', 'align', 'bold', 'underline', 'italic', 'strike'], ['video', 'image'], ['table'] ,['list', 'link'], ['removeFormat']]
                }} />
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button className="homeButton" variant="outline-primary" onClick={sender} >Send</Button>
            <Button className="homeButton" variant="outline-danger" onClick={props.closes}>Close</Button>
        </Modal.Footer>
        </Modal>
  </div>
    );
}