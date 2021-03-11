import React, {useState,useEffect} from 'react';
import Grider from './Grider';

// Text Editor
import CoustomAdvDesigner from './customAdvDesign';
import CustomTextDesigner from './customTxtDesign';

// Bootstrap
import Progress from 'react-progressbar';
import {Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faUpload } from '@fortawesome/free-solid-svg-icons';

// Firebase
import {storage, db} from '../../secure/firebase';
import firebase from 'firebase';

// Modal
import BgSelector from '../bgSelector'

export default function Table({allData, ratios, accName, BGC, BGI, setBGI, setBGC, reloader, display}) {

  // Moved From Grider
  const [text, setText] = useState("")
  const [image, setImage] = useState("")
  const [progresser, setProgresser] = useState(0)
  const [value, setValue] = useState(1)
  const size = {width: 400, height: 400}
  const position = {x: 0, y: 0}



// Horizontal / Vertical
  const [catxt, setCatxt] = useState(false)
  const [advtxt, setAdvtxt] = useState(false)

// Items
  var items = allData;

// Modal
  const [bg, setBg] = useState(false)

  useEffect(() => {
    handleSize()
    if(image !== ""){
      handleUpload()
    }
  },[ accName, ratios, image, allData]);

  // Handle Sizes
  function handleSize(){
    if (window.innerWidth < 1366){
      if(ratios.h === 768 && ratios.w === 1366){
        setValue(3)
      }else if(ratios.h === 1366 && ratios.w === 768){
        setValue(3.5)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        setValue(3)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        setValue(4.5)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        setValue(5.5)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        setValue(9)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        setValue(11)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        setValue(17)
      }
    }
    else if (window.innerWidth > 1366 && window.innerWidth <=1600){
      if(ratios.h === 768 && ratios.w === 1366){
        setValue(1.8)
      }else if(ratios.h === 1366 && ratios.w === 768){
        setValue(2.7)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        setValue(2.5)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        setValue(3.7)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        setValue(5)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        setValue(7.5)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        setValue(10)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        setValue(14.5)
      }
    }
    else if (window.innerWidth > 1600 && window.innerWidth <=1920){
      if(ratios.h === 768 && ratios.w === 1366){
        setValue(1.3)
      }else if(ratios.h === 1366 && ratios.w === 768){
        setValue(2)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        setValue(1.8)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        setValue(2.8)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        setValue(3.7)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        setValue(5.6)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        setValue(7.5)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        setValue(11)
      }
    }
    else if (window.innerWidth > 1920){
      if(ratios.h === 768 && ratios.w === 1366){
        setValue(1)
      }else if(ratios.h === 1366 && ratios.w === 768){
        setValue(1.5)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        setValue(2)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        setValue(2.7)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        setValue(4)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        setValue(5)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        setValue(8)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        setValue(12)
      }
    }
  }

  // Delete Grid
  function removeDiv(num, post){
    db.collection(accName).doc(num).delete()
    storage.refFromURL(post.imageURL).delete()
    console.log(`Deleted ${num}`)
  }

  //upload
  const handleChange = (e) => {
    if (e.target.files.length !== 0 ){
      setImage(e.target.files)
    }
  }

  const handleUpload = () => {
      if(Object.keys(image).length === 0 && text === ""){
        alert("Please Editor Something Before Upload")
      }
      else{
        var count = Object.keys(image).length
        if(Object.keys(image).length !== 0){
          Object.keys(image).map(each => {
            console.log(count)
            const uploadTask = storage.ref(`${accName}/${image[each].name}`).put(image[each]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //prograss Bar Math
                    const progressCount = Math.round(
                        snapshot.bytesTransferred/ snapshot.totalBytes * 100
                    );

                    setProgresser(progressCount)
                },
                (error) => {
                    console.log(error);
                    alert(error.message)
                },
                ()=> {
                    storage
                        .ref(accName)
                        .child(image[each].name)
                        .getDownloadURL()
                        .then(url => {
                            //post it in Db
                            db.collection(accName).doc(display).set({
                              ["Obj"+ String(Object.keys(items).length+1)] : {
                                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                size: size,
                                position: position,
                                imageURL: url,
                                fileType: image[each].type,
                                texts: text
                              }
                            }, { merge: true });
                            setImage("")
                            setText("")
                            setProgresser(0)
                        })
                      }
                )
              },
          )
        }
            else{
                //post it in Db
                db.collection(accName).doc(display).set({
                  ["Obj"+ String(Object.keys(items).length+1)] : {
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    size: size,
                    position: position,
                    imageURL: "",
                    fileType: "text",
                    texts: text
                  }
                }, { merge: true });
                setImage("")
                setText("")
            }
          // reloader()
      }
    }

    function updateDrag(id,e,position){
      console.log(position);
        // db.collection(accName).doc(id).update({
        //     position:{
        //         x: d.x*value,
        //         y: d.y*value
        //     }
        // })
    }

    function updateSize(id,ref,e){
      // console.log(ref)
        const changeW= Number((ref.width))
        const changeH= Number((ref.height))
        console.log(e)
        db.collection(accName).doc(id).update({
            size:{
                width: changeW*value,
                height: changeH*value
            }
        })
    }

  function clearBG(){
    setBGC({background: ""})
    setBGI("")
  }


  const clearCloud = () => {
    allData.map(each => cleaner(each.id))
  }

  const cleaner = async(each) => {
    await db.collection(accName).doc(each).delete()
  }

  return (
    <div className="outer">
      <div className="middle" style={{paddingTop: "4em"}}>
        <div className="main" style={{width: "60%", marginLeft: "20%"}}>
          <div className="table" id="table" >
            <div className="main_controller">
              <Row  style={{display : "flex", justifyContent: "space-around", alignSelf: "center", textAlign:"center"}} >
                <Col>
                  <div className="columns" >
                    <label className="custom-file-upload" title='Images, Videos'>
                      <input type="file"  multiple style={{display: "none"}} onChange={(e) => handleChange(e)}/>
                        Images / Videos{" "}
                      <FontAwesomeIcon icon={faUpload} />
                    </label>
                  </div>
                </Col>
                <Col>
                  <Button className="homeButton" variant="btn btn-outline-success" onClick={()=>{setAdvtxt(true)}} title='Table Blocks' >Text / Table{" "}<FontAwesomeIcon icon={faTable} /></Button>
                  <CoustomAdvDesigner show={advtxt} value={text} setvalue={setText} closes={()=>setAdvtxt(false)} sendit={handleUpload} />
                </Col>
                <Col>
                  <Button className="homeButton" type="button" variant="btn btn-outline-primary" onClick={() => {window.location="#/finalPreview"}} title="Content Preview" >Preview</Button>
                </Col>
              </Row>
            </div>
            <div className="fixedDisplay" >
                <div className="centerer" >
                  <div className="changeDisplay">
                    <div className="preview" >
                      <Row>
                        <Col>{ratios.w}{" "} x {" "}{ratios.h}</Col>
                        <Col>{window.innerWidth}{" "} x {" "}{window.innerHeight}</Col>
                      </Row>
                      <div style={{ width: ratios.w/value+4}} >
                        <Grider ratioStyle={ratios} bgc={BGC} bgi={BGI} decide={value} change={items} removeDiv={removeDiv} dragged={updateDrag} resized={updateSize} acc={accName} />
                      </div>
                    </div>
                  </div>
              </div>
          </div>
            <Progress completed={progresser} style={{borderRadius: "10px", backgroundColor: "#0000"}} />
            <Row style={{display : "flex", justifyContent: "space-around", alignSelf: "center", textAlign:"center"}} >
              <Col><Button className="homeButton"  variant="btn btn-outline-danger customButton" onClick={() => {window.location = "#/home"}}>Back</Button></Col>
              <Col>
                  <button type="submit" className="btn btn-outline-primary mb-2"  onClick={()=>setBg(true)} >Select Background</button>
              </Col>
              <Col><Button className="homeButton"  variant="btn btn-outline-primary customButton" onClick={clearBG}>Remove BackGround</Button></Col>
              <Col><Button  className="homeButton" variant="btn btn-outline-danger customButton" onClick={clearCloud}>Remove All</Button></Col>
            </Row>
            <BgSelector loader={setProgresser} tmp={bg} setTmp={setBg} bgc={BGC} setbgc={setBGC} userName={accName} setbgimg={setBGI} />
          </div>
        </div>
     </div>
    </div>
  )
}
