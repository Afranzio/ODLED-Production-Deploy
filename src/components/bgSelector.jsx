import React from 'react'
import {Button,Row, Col, Modal} from 'react-bootstrap'

// Components
import ColorPicker from './colorPicker'

// Style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

//Firebase
import{db, storage} from '../secure/firebase'


export default function BgSelector({tmp, setTmp, bgc, setbgc, setbgimg, userName, loader}) {

    function MyVerticallyCenteredModal(props) {

      function fileUploadInputChange (e){
        let reader = new FileReader();
        reader.onload = function(e) {
          setbgimg(e.target.result);
          props.onHide()
        };
        uploadBG(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
      }

    function uploadBG(e){
      const uploadTask = storage.ref(`${userName}/BGImage`).put(e);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              //prograss Bar Math
              const progressCount = Math.round(
                  snapshot.bytesTransferred/ snapshot.totalBytes * 100
              );
              loader(progressCount)
          },
          (error) => {
              console.log(error);
              alert(error.message)
          },
          ()=> {
              storage
                  .ref(userName)
                  .child("BGImage")
                  .getDownloadURL()
                  .then(url => {
                      //post it in Db
                      db.collection(userName).doc("configuration").update({
                        bgImage: url
                      });
                  })
              }
        )
      }
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
                Select Your Background
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "rgb(128,128,128,0.7)"}} >
              <Row className="templateRow" >
                  <Col  style={{display : "flex", justifyContent: "center"}} >
                    <ColorPicker hidePrompt={props.onHide} BGC={bgc} setBGC={setbgc} onClick={props.onHide} />
                  </Col>
                  <Col  style={{display : "flex", justifyContent: "center", alignSelf: "center"}} >
                     <div className="columns" >
                        <label className="custom-file-upload" title='Images'>
                        <input type="file" style={{display: "none"}} onChange={(e) => {fileUploadInputChange(e)}} accept="image/*, video/*" />
                            Choose Image{" "}
                        <FontAwesomeIcon icon={faUpload} />
                        </label>
                    </div>
                  </Col>
              </Row>             
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: "rgb(128,128,128,0.7)"}}>
              <Button className="homeButton" varient='btn-outline' onClick={props.onHide}>Select</Button>
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
