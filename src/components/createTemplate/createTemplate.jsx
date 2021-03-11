import React, {useState,useEffect} from 'react'
import Viewer from './viewer'
import {MyVerticallyCenteredModal} from './namingModel'

import Dummy from '../../asset/imgs/Dummy.jpg'

// Bootstrap
import {Button, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

// Firebase
import {db} from '../../secure/firebase'
import firebase from 'firebase';

export default function CreateTemplate({user, selectedTemp, reloader, ratio }) {

  const [ratios, setRatios] = useState(ratioMatter())
  const [listItem, setListItem] = useState([])
  const [value, setValue] = useState(handleSize())

  const [templateName, setTemplateName] = useState("")

  const [view, setView] = useState(false)

  useEffect(() => {
    handleSize()
  },[listItem]);

  function ratioMatter(){
    if(ratio.w > ratio.h){
      return({w: 1366, h: 768})
    }else{
      return({w: 768, h: 1366})
    }
  }

  function addBoxs(){
    var b = {
      size: {width: 500, height: 500},
      position: {x: 0, y: 0},
      imageURL: Dummy,
      fileType: 'image/png',
      texts: '',
      ratio: {w: 1080, h: 1920},
      file: {},
      id: `Obj${listItem.length+1}`
    }
    setListItem([...listItem, b])
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


  function deleteDiv(keys){
    var newList = listItem.filter(each => each.id !== keys.id)
    setListItem(newList)
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
  console.log(allItems)
}

function SendData(){
  listItem.map(each => {
    each.id === "obj1" ?
    db.collection(user).doc("templates").set({
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
            imageURL: [each.imageURL],
            fileType: each.fileType,
            texts: each.texts,
            id: each.id
        }
      }}, { merge: true })
      : 
      db.collection(user).doc("templates").set({
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
            imageURL: [each.imageURL],
            fileType: each.fileType,
            texts: each.texts,
            id: each.id
          }
        }}, { merge: true })
  })
  setView(false)
}

  return (
    <div className="outer">
        <div className="middle" style={{paddingTop: "4em"}}>
            <div className="main" style={{width: "60%", marginLeft: "20%"}}>
              <div className="table" id="table" >
                <div className="main_controller">
                  <Row  style={{display : "flex", justifyContent: "space-around", alignSelf: "center", textAlign:"center"}} >
                    <Col>
                      <Button className="homeButton" onClick={addBoxs}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                        { " " }
                        Add
                      </Button>
                    </Col>
                    <Col>
                        <Button className="homeButton" onClick={()=>{setView(true)}} >
                          Next
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" className="homeButton" onClick={()=>{window.location.reload(1)}} >
                          Back
                        </Button>
                    </Col>
                </Row>
                </div>
                <div className="fixedDisplay" >
                    <div className="centerer" >
                      <div className="changeDisplay">
                        <div className="preview" >
                          <div style={{ width: ratios.w/value+4, height: ratios.h/value+4, border: "1px solid black"}} >
                            <Viewer ratioStyle={ratios} decide={value} removeDiv={deleteDiv} change={listItem} dragged={setPosition} resized={setSize} />
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
                <MyVerticallyCenteredModal show={view} setShows={()=>{setView(false)}} tempName={setTemplateName} runUpload={SendData} />
              </div>
            </div>
        </div>
    </div>
  )
}
