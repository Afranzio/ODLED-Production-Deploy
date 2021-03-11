import React,{useState} from 'react';
import {Modal, Button, Container} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';

export default function CoustomAdvDesigner(props) {

  const [text, setText] = useState("")

  function sender(){
    if(props.valueText !== ""){
      props.updater(text)
    }
    else{
      props.setvalue(text)
    }
    props.closes()
  }

  const handleEditorChange = (e) => {
    setText(e.target.getContent())
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
            <Editor
          apiKey="hb0dbdm06xalwbj6wrlv07xnmpc08h9cbw5u0e5aa9tm96rq"
          initialValue= {props.valueText ? props.valueText : "<p>Feel Free To Rewrite</p>"}
          init={{
              plugins: [
                "a11ychecker casechange formatpainter",
                "linkchecker autolink lists checklist",
                "media mediaembed pageembed permanentpen",
                "powerpaste table"
              ],
              toolbar: "formatselect | fontselect | bold italic strikethrough forecolor backcolor formatpainter | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link insertfile image | removeformat | addcomment | checklist | casechange",
              content_style: [
                  "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap'); body { font-family: 'Roboto', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Lato', sans-serif; }",
                  "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap'); body { font-family: 'Open Sans', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Open Sans', sans-serif; }",
                  "@import url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap'); body{font-family: 'Potta One', cursive;} h1,h2,h3,h4,h5,h6 {font-family: 'Potta One', cursive;}",
                  "@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');  body{font-family: 'Montserrat', sans-serif;} h1,h2,h3,h4,h5,h6 {font-family: 'Montserrat', sans-serif;}"
              ],
              font_formats:
              "Andale Mono=andale mono,times; Open Sans=Open Sans, sans-serif; Arial=arial,helvetica,sans-serif; Roboto=Roboto, sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Montserrat=Montserrat, verdana; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; Potta One=Potta One, cursive",
              skin: "snow",
              height: 420
          }}
          onChange={handleEditorChange}
          />
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