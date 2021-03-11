import React, {useState,useEffect,useRef} from 'react'
import Viewer from './viewer'
import {MyVerticallyCenteredModal} from './namingModel'
import CoustomAdvDesigner from '../customAdvDesign';
import Done from '../done';
import BgSelector from '../bgSelector'

// Alert
import Alert from '../alert'

// Bootstrap
import {Button, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTable } from '@fortawesome/free-solid-svg-icons'

// Firebase
import {db, storage} from '../../secure/firebase'
import firebase from 'firebase';

export default function CreateTemplate({accName, selectedTemp, reloader, ratioNum, setBGI, setBGC, BGC, BGI, display}) {
  const [items, setItems] = useState({})
  const [ratios, setRatios] = useState({w: 1366, h: 768})
  const [templateName, setTemplateName] = useState("")
  const [view, setView] = useState(false)
  const [advtxt, setAdvtxt] = useState(false)
  const [bg, setBg] = useState(false)
  const [progresser, setProgresser] = useState(0)
  const [listItem, setListItem] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const [boxText, setBoxText] = useState()

  let value = handleSize();
  var templatesize = Math.ceil(handletemp());

  useEffect(() => {
    if(accName){
      fetchDisplay();
      ratioDecide();
    }
  },[]);

  const ref = useRef(null);

  async function fetchDisplay(){
    if(display && accName){
      const snapshot = await db.collection(accName).doc(display).get();
      if(snapshot.data()){
        var data = snapshot.data()
        var tempList = []
        Object.keys(data).map(each => {
          tempList.push(data[each])
        })
        setListItem(tempList)
      } 
    }
  }

  function ratioDecide(){
    if(ratioNum.w > ratioNum.h){
      setRatios ({w: 1366, h: 768})
    }
    else{
      setRatios ({w: 768, h: 1366})
    }
  }

  function handletemp(){
    if(ratioNum.w === 1366){
        return(1366/1366)
    }
    else if(ratioNum.w === 1920){
        return(1920/1366)
    }
    else if(ratioNum.w === 3840){
        return(3840/1366)
    }
    else if(ratioNum.w === 7680){
        return(7680/1366)
    }
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
        return (5)
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

  function addBoxs(point, type, evnpoint){
    var allItems = listItem
    if(evnpoint){
      var b = {
        size: {width: 500, height: 500},
        position: {x: 0, y: 0},
        imageURL: [point],
        texts: "",
        ratio: {w: 1080, h: 1920},
        fileType: type,
        id: `Obj${listItem.length+1}`,
        evn : evnpoint
      }
      allItems.push(b)
      console.log(allItems) 
      setListItem(allItems)
    }
  }

  function addText(txt){
    var allItems = listItem
    var b = {
      size: {width: 500, height: 500},
      position: {x: 0, y: 0},
      imageURL: [],
      texts: txt,
      ratio: {w: 1080, h: 1920},  
      fileType: "text",
      id: `Obj${listItem.length+1}`,
    }
    allItems.push(b)
    setListItem(allItems)
  }

  const onImageChange = (event) => {
    if(event){
        var files = event
        let reader = new FileReader();
        reader.onload = async (e) => {
          await addBoxs(e.target.result, files.type, files)
        };
        reader.readAsDataURL(files);
    }
  }

  const forwarder = (event) => {
    if(event){
      Object.keys(event.target.files).map(each => {
        if(event.target.files[each].type === 'image/png' || event.target.files[each].type === 'image/jpeg' || event.target.files[each].type === 'image/jpg' || event.target.files[each].type === 'image/gif' ){
          onImageChange(event.target.files[each])
        }
        else if(event.target.files[each].type === "video/mp4" ||event.target.files[each].type === "video/avi" || event.target.files[each] === "video/flv" || event.target.files[each] === "video/mkv" ){
          addBoxs(URL.createObjectURL(event.target.files[each]), event.target.files[each].type, event.target.files[each])
        }
      })
    }
  }

  function deleteDiv(keys, e){
    var tempItems = listItem.filter(each => each.id !== keys.id)
    setListItem(tempItems)
    db.collection(accName).doc(display).update({
      [keys.id]: firebase.firestore.FieldValue.delete()
    })
  }

  function setSize(ref,each){
    var tempPosition = each
    const changeW= Number((ref.style.width).slice(0,-2))
    const changeH= Number((ref.style.height).slice(0,-2))
    tempPosition.size = {
      width :  changeW*value,
      height :  changeH*value
    }
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
   }

  function setPosition(each,e,d){
    var tempPosition = each
    tempPosition.position = {
      x : d.x*value,
      y : d.y*value
    }
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
  }

  function userPosition(each,x,y){
    var tempPosition = each
    tempPosition.position = {
      x : x,
      y : y
    }
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
  }

  function addNewFiles(each, url){
    var tempPosition = each
    tempPosition.imageURL.push(url)
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    console.log(allItems)
    setListItem(allItems)
  }

  function userSize(each, width, height){
    var userSize = each
    userSize.size = {
      width : width,
      height : height
    }
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(userSize)
    setListItem(allItems)
  }

  function contexted(value){
    setBoxText(value);
  }

  function updateText(each, texts){
    var tempPosition = each
    tempPosition.texts = texts
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
  }

  function changeNewInterval(each, value){
    var tempPosition = each
    tempPosition.interval = value
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
  }

  function changeNewTrans(value, each){
    var tempPosition = each
    tempPosition.transitionTime = value
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
  }

  function changeNewAxis(value, each){
    var tempPosition = each
    tempPosition.axis = value
    var allItems = listItem.filter(check => check.id !== each.id)
    allItems.push(tempPosition)
    setListItem(allItems)
  }

  function masterHandler(each, x, y, width, height){
    var temp = each
    temp.position.x = x;
    temp.position.y = y;
    temp.size.width = width;
    temp.size.height = height;
    // setData({...data, [each]:temp})
    console.log(temp)
  }

  function checkLast(each){ 
    if(each.id === listItem[listItem.length-1].id){
      window.location="#/finalPreview";
      setLoading(false)
    }
    else{
      return null
    }
  }

  const handleCompleteUploader = () => {
    if(listItem.length !== 0){
      setLoading(true)
    listItem.map(each => {
      if(each.fileType !== "text" && each.texts === ""){
        if(each.file !== null && each.evn ){
          var prefix = new Date().getTime()
          const uploadTask = storage.ref(`${accName}/${ prefix + each.evn.name}`).put(each.evn);
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                //prograss Bar Math
                Math.round(snapshot.bytesTransferred/snapshot.totalBytes * 100);
              },
              (error) => {
                  console.log(error);
                  alert(error.message)
              },
              ()=> {
                storage
                    .ref(accName)
                    .child(prefix + each.evn.name)
                    .getDownloadURL()
                    .then(url => {
                        //post it in Db
                        if(display && accName){
                          db.collection(accName).doc(display).set({
                            [each.id]:{
                              timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                              size: {
                                  width: each.size.width,
                                  height: each.size.height
                              },
                              position: {
                                  x: each.position.x,
                                  y: each.position.y
                              },
                              imageURL: [url],
                              fileType: each.fileType,
                              texts: each.texts,
                              id: each.id,
                              interval:  each.interval? Number(each.interval) : 1,
                              transitionTime: each.transitionTime? Number(each.transitionTime) : 350,
                              axis: each.axis ? each.axis : "horizontal"
                            }}, { merge: true }).then(checkLast(each))
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
                        width: each.size.width,
                        height: each.size.height
                    },
                    position: {
                        x: each.position.x,
                        y: each.position.y
                    },
                    imageURL: each.imageURL,
                    fileType: each.fileType,
                    texts: each.texts,
                    id: each.id,
                    interval: each.interval? Number(each.interval) : 1,
                    transitionTime: each.transitionTime? Number(each.transitionTime) : 350,
                    axis: each.axis ? each.axis : "horizontal"
                  }}, { merge: true }).then(checkLast(each))
              }
            }
            else if (each.fileType === "text" && each.texts !== ""){
              db.collection(accName).doc(display).set({
                [each.id]:{
                  timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                  size: {
                      width: each.size.width,
                      height: each.size.height
                  },
                  position: {
                      x: each.position.x,
                      y: each.position.y
                  },
                  imageURL: each.imageURL,
                  fileType: each.fileType,
                  texts: each.texts,
                  id: each.id,
                  interval: each.interval? Number(each.interval) : 1,
                  transitionTime: each.transitionTime? Number(each.transitionTime) : 350,
                  axis: each.axis ? each.axis : "horizontal"
                }}, { merge: true }).then(checkLast(each))
            }
        }
    )
    db.collection(accName).doc("configuration").update({
      bgImage: BGI,
      bgColor : BGC
    }) 
    }else{
      setMsg("Please Create Some Layout Before Upload")
      handleClick();
    }
  }

  function savaProject(){
    listItem.map(each => {
      db.collection(accName).doc("templates").set({
          [templateName]:{
              [each.id]:{
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                size: {
                    width: each.size.width,
                    height: each.size.height
                },
                position: {
                    x: each.position.x,
                    y: each.position.y
                },
                imageURL: each.imageURL,
                fileType: each.fileType,
                texts: each.texts,
                id: each.id,
                interval: 1,
                transitionTime: 350,
                axis: "horizontal"
            }
          }}, { merge: true })
      setView(false)
    })
  }

  function clearBG(){
    db.collection(accName).doc("configuration").update({
      bgImage: "",
      bgColor : {background : "#fff"}
      })
    setBGC({background: ""})
    setBGI("")
  }

  const handleClick = () => {
    ref.current.handleShow();
  };

  return (
    <div className="outer">
        <div className="middle" style={{paddingTop: "4em"}}>
            <div className="main" style={{width: "60%", marginLeft: "20%"}}>
              <div className="table" id="table" >
                <div className="main_controller">
                  <Row  style={{display : "flex", justifyContent: "space-around", alignSelf: "center", textAlign:"center"}} >
                  <Col>
                    <div className="columns" >
                      <label className="custom-file-upload" style={{borderRadius: "5px"}} title='Images, Videos'>
                        <input type="file" style={{display: "none"}} multiple onChange={(e) => forwarder(e)} accept="image/*, video/*" />
                        Choose File{" "}
                        <FontAwesomeIcon icon={faUpload} />
                      </label>
                    </div>
                  </Col>
                  <Col> 
                    <Button className="homeButton" variant="btn btn-outline-primary" onClick={()=>{setAdvtxt(true)}} title='Table Blocks' >Text/Table{" "}<FontAwesomeIcon icon={faTable} /></Button>
                    <CoustomAdvDesigner show={advtxt} valueText={boxText} setcontext={contexted} updater={updateText} setvalue={addText} closes={()=>setAdvtxt(false)} />
                  </Col>
                    <Col>
                        <Button variant="btn btn-outline-success" className="homeButton" onClick={()=>{setView(true)}} >
                          Save Project
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="btn btn-outline-primary" className="homeButton" onClick={()=>{handleCompleteUploader();}} >
                          Preview
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="btn btn-outline-danger" className="homeButton" onClick={()=>{window.location = "#/home"}} >
                          Cancel
                        </Button>
                    </Col>
                </Row>
                </div>
                <div className="fixedDisplay" >
                    <div className="centerer" >
                      <div className="changeDisplay">
                        <div className="preview" >
                          {`${ratioNum.w} x ${ratioNum.h}`}
                          {console.log(listItem)}
                          <div style={{ width: ratios.w/value, height: ratios.h/value, border: "1px solid black"}} >
                            <Viewer setnewFile={addNewFiles} setcontext={contexted} intervalperiod={changeNewInterval} transitionTime={changeNewTrans} setMaster={masterHandler} axis={changeNewAxis} tryList={listItem} ratioStyle={ratios} usrpos={userPosition} usrsize={userSize} decide={value} removeDiv={deleteDiv} change={items} dragged={setPosition} resized={setSize} bgc={BGC} bgi={BGI} usr={accName} dis={display} />
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
                <MyVerticallyCenteredModal show={view} setShows={()=>{setView(false)}} runUpload={savaProject} tempName={setTemplateName} />
                <BgSelector loader={setProgresser} tmp={bg} setTmp={setBg} bgc={BGC} setbgc={setBGC} userName={accName} setbgimg={setBGI} />
                <Row style={{justifyContent: "center", textAlign : "center"}}>
                  <Col>
                      <button type="submit" className="btn btn-outline-primary mb-2"  onClick={()=>setBg(true)} >Select Background</button>
                  </Col>
                  <Col>
                    <Done show={loading} onHide={() => setLoading(false)} />
                    <Button className="homeButton"  variant="btn btn-outline-primary customButton" onClick={clearBG}>Remove BackGround</Button>
                    <Alert style={{fontFamily: "'Quicksand', sans-serif"}} message={msg} ref={ref} />
                  </Col>
                </Row>
              </div>
            </div>
        </div>
    </div>
  )
}
