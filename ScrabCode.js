                {/* <Sidebar position="left" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                            style={{padding: "0", width:'175px', minHeight: '100%', marginTop: "75px"}}>
                    <Menu model={items}
                            style={{width: '100%', minHeight:'100vh'}}/>
                </Sidebar> */}                
                
                {/* <Sidebar position="top" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                            style={{height:'70px', backgroundColor:'#0471ed', textAlign:'center'}}>
                    <h2 style={{color:'white'}}><a href='/' className='Main-Logo' >OD LED</a></h2>
                </Sidebar>
                <Sidebar position="top" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                            style={{height:'70px', backgroundColor:'#0471ed', textAlign:'right'}}>
                            <Button variant="dark" onClick={() => {window.location = '#/login'}} >Login</Button>
                </Sidebar> */}
                {/* <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://yt3.ggpht.com/ytc/AAUvwnjYldYGML_wJN8OxDbw0If-Q3lWcbbDA8figF-U=s900-c-k-c0x00ffffff-no-rj"
                        width="100"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                    </Navbar.Brand>
                    <h4 style={{color: "white"}} >OD LED</h4>
                    <Form inline>
                        <Button variant="outline-primary">Login</Button>
                    </Form>
                </Navbar> */}
                {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="https://yt3.ggpht.com/ytc/AAUvwnjYldYGML_wJN8OxDbw0If-Q3lWcbbDA8figF-U=s900-c-k-c0x00ffffff-no-rj"
                            width="100"
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#/" style={{color: "white", fontSize: '1.5em', fontWeight: "bolder"}}>OD LED</Nav.Link> */}
                            {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        {/* </Nav>
                        <Nav>
                            <Nav.Link eventKey={2} href="#/login">
                                <Button variant="outline-secondary" >Login</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar> */}

                import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {Button, Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'


{Object.keys(templates).map(each => {
    <Rnd
        bounds='parent'
        // size={{ width: templates[each].size.width/value*templatesize, height: templates[each].size.height/value*templatesize }}
        // default={{ x: templates[each].position.x/value*templatesize, y: templates[each].position.y/value*templatesize }}
        size={{ width: templates[each].size.width, height: templates[each].size.height }}
        default={{ x: templates[each].position.x, y: templates[each].position.y }}
        // onResizeStop={(e, direction, ref, delta, position) =>{resized(ref,each)}}
        // onDragStop={(e,d)=>dragged(each,e,d)}
        // disableDragging={dragpoint}
    >
        {/* <FSTemplate drags={setDragpoint} mngFile={addFile} mngTxt={addText} values={value} tmpSize={templatesize} setpixs={userPixel} obj={each} datas={templates[each]} /> */}
        <FSTemplate obj={each} datas={templates[each]} />
    </Rnd>
})}

{currentTemplate !== null ? 
    Object.keys(currentTemplate).map(each => {
        <Rnd
            bounds='parent'
            // size={{ width: templates[each].size.width/value*templatesize, height: templates[each].size.height/value*templatesize }}
            // default={{ x: templates[each].position.x/value*templatesize, y: templates[each].position.y/value*templatesize }}
            size={{ width: templates[each].size.width, height: templates[each].size.height }}
            default={{ x: templates[each].position.x, y: templates[each].position.y }}
            // onResizeStop={(e, direction, ref, delta, position) =>{resized(ref,each)}}
            // onDragStop={(e,d)=>dragged(each,e,d)}
            // disableDragging={dragpoint}
        >
            {/* <FSTemplate drags={setDragpoint} mngFile={addFile} mngTxt={addText} values={value} tmpSize={templatesize} setpixs={userPixel} obj={each} datas={templates[each]} /> */}
            <FSTemplate obj={each} datas={templates[each]} />
        </Rnd>
    })
: null}




if(image !== ""){
    const uploadTask = storage.ref(`${accName}/${image.name}`).put(image);
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
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post it in Db
                    db.collection(accName).add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        size: size,
                        position: position,
                        imageURL: url,
                        fileType: image.type,
                        texts: text,
                        ratio: ratios,
                        bgColor: BGC
                    });
                    setImage("")
                    setText("")
                    setProgresser(0)
                })
            }
        )
      }



Upload Code.

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
                  .child(image.name)
                  .getDownloadURL()
                  .then(url => {
                      //post it in Db
                      db.collection(accName).add({
                          timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                          size: size,
                          position: position,
                          imageURL: url,
                          fileType: image[each].type,
                          texts: text,
                          ratio: ratios,
                          bgColor: BGC
                      });
                      setImage("")
                      setText("")
                      setProgresser(0)
                  })
              }
          )
        }


Swap size Code.
<Col>
    <FormControlLabel
        className="Label"
        control={<IOSSwitch checked={ratios.w < ratios.h ? true : false} onChange={swap} name="checkedB" />}
        label="Vertical"
        style={{fontFamily: ""}}
    />
</Col>


//Custom Design




import React, {useState,useEffect} from 'react'
import Viewer from './viewer'
import {MyVerticallyCenteredModal} from './namingModel'
import CoustomAdvDesigner from '../custom/customAdvDesign';


import Dummy from '../../asset/imgs/Dummy.jpg'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap
import {Button, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faUpload } from '@fortawesome/free-solid-svg-icons';

// Firebase
import {db, storage} from '../../secure/firebase'
import firebase from 'firebase';

// Modal
import BgSelector from '../bgSelector'

export default function ModernCreate({allData, accName, BGC, BGI, setBGI, setBGC, reloader}) {

  const ratios = {w: 1366, h: 768}

  const [items, setItems] = useState({})
  const [value, setValue] = useState(handleSize())

  const [templateName, setTemplateName] = useState("")

  // Moved From Grider
  const [text, setText] = useState("")
  const [image, setImage] = useState("")
  const [progresser, setProgresser] = useState(0)
  const size = {width: 400, height: 400}
  const position = {x: 0, y: 0}
    
  
  
  // Horizontal / Vertical
  const [advtxt, setAdvtxt] = useState(false)

  
  // Modal
  const [bg, setBg] = useState(false)

  const [view, setView] = useState(false)

  useEffect(() => {
    handleSize()
  },[items]);

  function addBoxs(){
    var b = {
      size: {width: 500, height: 500},
      position: {x: 0, y: 0},
      imageURL: Dummy,
      fileType: 'image/png',
      texts: '',
      ratio: {w: 1080, h: 1920},
      file: {},
      id: Object.keys(items).length+1
    }
    setItems({...items, ["obj"+ String(Object.keys(items).length+1)] : b})
  }

  // Handle Sizes
  function handleSize(){
    if (window.innerWidth < 1366){
      if(ratios.h === 768 && ratios.w === 1366){
        return (3)
      }else if(ratios.h === 1366 && ratios.w === 768){
        return (3.5)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        return (3)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        return (4.5)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        return (5.5)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        return (9)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        return (11)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        return (17)
      }
    }
    else if (window.innerWidth > 1366 && window.innerWidth <=1600){
      if(ratios.h === 768 && ratios.w === 1366){
        return (1.8)
      }else if(ratios.h === 1366 && ratios.w === 768){
        return (2.7)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        return (2.5)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        return (3.7)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        return (5)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        return (7.5)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        return (10)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        return (14.5)
      }
    }
    else if (window.innerWidth > 1600 && window.innerWidth <=1920){
      if(ratios.h === 768 && ratios.w === 1366){
        return (1.5)
      }else if(ratios.h === 1366 && ratios.w === 768){
        return (2)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        return (2.2)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        return (3)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        return (4.5)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        return (5.6)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        return (9)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        return (11)
      }
    }
    else if (window.innerWidth > 1920){
      if(ratios.h === 768 && ratios.w === 1366){
        return (1)
      }else if(ratios.h === 1366 && ratios.w === 768){
        return (1.5)
      }else if(ratios.h === 1080 && ratios.w === 1920){
        return (2)
      }else if(ratios.h === 1920 && ratios.w === 1080){
        return (2.7)
      }else if(ratios.h === 2160 && ratios.w === 3840){
        return (4)
      }else if(ratios.h === 3840 && ratios.w === 2160){
        return (5)
      }else if(ratios.h === 4320 && ratios.w === 7680){
        return (8)
      }else if(ratios.h === 7680 && ratios.w === 4320){
        return (12)
      }
    }
  }


  function deleteDiv(keys, e){
    let temp = items
    delete temp[keys]
    setItems(temp)
  }

  function setSize(ref,each){
    var temp = items[each]
    const changeW= Number((ref.style.width).slice(0,-2))
    const changeH= Number((ref.style.height).slice(0,-2))
    temp.size.width = changeW*value;
    temp.size.height = changeH*value;
    setItems({...items, [each]:temp})
}

function setPosition(each,e,d){
    var temp = items[each]
    temp.position.x = d.x*value;
    temp.position.y = d.y*value;
    setItems({...items, [each]:temp})
}

function SendData(){
  Object.keys(items).map(each => {
      db.collection(accName).doc("templates").set({
        [templateName]:{
          [each]:{
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            size: {
                width: items[each].size.width,
                height: items[each].size.height
            },
            position: {
                x: items[each].position.x,
                y: items[each].position.y
            },
            imageURL: items[each].imageURL,
            fileType: items[each].fileType,
            texts: items[each].texts
          }
        }}, { merge: true })
  })
  setView(false)
  window.location="#/"
  reloader();
}

const handleUpload = () => {
  if(Object.keys(image).length === 0 && text === ""){
    alert("Please Editor Something Before Upload")
  }
  else{
    var count = Object.keys(image).length
    if(Object.keys(image).length !== 0){
      Object.keys(image).map(each => {
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
                        db.collection(accName).doc("display1").set({
                          [image[each].name] : {
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
                    count++;
                  }
            )
          }
      )
    }
        else{
            //post it in Db
            db.collection(accName).doc("display1").set({
              ["text"] : {
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                size: size,
                position: position,
                imageURL: image,
                fileType: "text",
                texts: text
              }
            }, { merge: true });
            setImage("")
            setText("")
        }
  }
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

  const handleSendData = () => {
    Object.keys(items).map(each => {
      const uploadTask = storage.ref(`${accName}/${image[each].name}`).put(image[each])
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
                      db.collection(accName).doc("display1").set({
                        [templateName]:{
                          [each]:{
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            size: {
                                width: items[each].size.width,
                                height: items[each].size.height
                            },
                            position: {
                                x: items[each].position.x,
                                y: items[each].position.y
                            },
                            imageURL: items[each].imageURL,
                            fileType: items[each].fileType,
                            texts: items[each].texts
                        }
                      }}, { merge: true })
                      setImage("")
                      setText("")
                      setProgresser(0)
                  })
                }
              )
    setView(false)
    window.location="#/"
    reloader();
  })
}

  return (
    <div className="outer">
        <div className="middle" style={{paddingTop: "4em"}}>
            <div className="main" style={{width: "60%", marginLeft: "20%"}}>
              <div className="table" id="table" >
                <div className="main_controller">
                <div className="main_controller">
                  <Row  style={{display : "flex", justifyContent: "space-around", alignSelf: "center", textAlign:"center"}} >
                    <Col>
                      <div className="columns" >
                        <label className="custom-file-upload" title='Images, Videos'>
                          <input type="file"  multiple style={{display: "none"}}/>
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
                    <Col>
                      <Button className="homeButton" type="button" variant="btn btn-outline-primary" onClick={handleSendData} title="Content Preview" >check</Button>
                    </Col>
                  </Row>
                </div>
                <div className="fixedDisplay" >
                    <div className="centerer" >
                      <div className="changeDisplay">
                        <div className="preview" >
                          <div style={{ width: ratios.w/value+4, height: ratios.h/value+4, border: "1px solid black"}} >
                            <Viewer ratioStyle={ratios} decide={value} removeDiv={deleteDiv} change={items} dragged={setPosition} resized={setSize} />
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
                <MyVerticallyCenteredModal show={view} setShows={()=>{setView(false)}} tempName={setTemplateName} runUpload={SendData} />
              </div>
            </div>
        </div>
            <Row style={{display : "flex", justifyContent: "space-around", alignSelf: "center", textAlign:"center"}} >
              <Col><Button className="homeButton"  variant="btn btn-outline-danger customButton" onClick={() => {window.location = "#/"}}>Back</Button></Col>
              <Col>
                  <button type="submit" className="btn btn-outline-primary mb-2"  onClick={()=>setBg(true)} >Select Background</button>
              </Col>
              <Col><Button className="homeButton"  variant="btn btn-outline-primary customButton" onClick={clearBG}>Remove BackGround</Button></Col>
              <Col><Button  className="homeButton" variant="btn btn-outline-danger customButton" onClick={clearCloud}>Remove All</Button></Col>
            </Row>
          <BgSelector loader={setProgresser} tmp={bg} setTmp={setBg} bgc={BGC} setbgc={setBGC} userName={accName} setbgimg={setBGI} />
      </div>
    </div>
  )
}


const service = () => {
  if(datas){
      if(datas.texts !== '' && datas.fileType === 'text' && datas.imageURL === '' ){
          return <div dangerouslySetInnerHTML={{__html: datas.texts}} />
      }
      else if(datas.imageURL !== ''){
          if(datas.fileType === "image/png" || datas.fileType === "image/jpeg" || datas.fileType === "image/jpg" || datas.fileType === "image/gif"){
              return <img draggable="false" src={datas.imageURL} className='img' alt='' />
          }
          else if(datas.fileType === "video/mp4" || datas.fileType === "video/avi" || datas.fileType === "video/flv" || datas.fileType === "video/mkv"){
              return <video src={datas.imageURL} className='img' loop={true} autoPlay={true} alt='' />
          }
      }
  }
}






const handleCompleteUploader = () => {
  Object.keys(items).map(each => {
    if(items[each].fileType !== "text" && items[each].texts === ""){
      if(items[each].file !== null && items[each].evn ){
        const uploadTask = storage.ref(`${accName}/${items[each].evn.name}`).put(items[each].evn);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              //prograss Bar Math
              Math.round(snapshot.bytesTransferred/ snapshot.totalBytes * 100);
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            ()=> {
              storage
                  .ref(accName)
                  .child(items[each].evn.name)
                  .getDownloadURL()
                  .then(url => {
                      //post it in Db
                      if(display && accName){
                        db.collection(accName).doc(display).set({
                          [each.id]:{
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            size: {
                                width: items[each].size.width,
                                height: items[each].size.height
                            },
                            position: {
                                x: items[each].position.x,
                                y: items[each].position.y
                            },
                            imageURL: url,
                            fileType: items[each].fileType,
                            texts: items[each].texts,
                            id: each
                          }}, { merge: true })
                      }
                  })
                }
              )
            }
            else{
              db.collection(accName).doc(display).set({
                [each.id]:{
                  timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                  size: {
                      width: items[each].size.width,
                      height: items[each].size.height
                  },
                  position: {
                      x: items[each].position.x,
                      y: items[each].position.y
                  },
                  imageURL: items[each].imageURL,
                  fileType: items[each].fileType,
                  texts: items[each].texts,
                  id: each
                }}, { merge: true })
            }
          }
          else if (items[each].fileType === "text" && items[each].texts !== ""){
            db.collection(accName).doc(display).set({
              [each.id]:{
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                size: {
                    width: items[each].size.width,
                    height: items[each].size.height
                },
                position: {
                    x: items[each].position.x,
                    y: items[each].position.y
                },
                imageURL: items[each].imageURL,
                fileType: items[each].fileType,
                texts: items[each].texts,
                id: each
              }}, { merge: true })
          }
      }
  )
  window.location = "#/finalPreview"
}


<Row>
  <div className="columns" style={styles} >
    <Col>
      <JointClimb />
    </Col>
  </div>
</Row>