import React,{useEffect,useRef} from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd'
import { Textfit } from 'react-textfit';
import ReactHtmlParser from 'react-html-parser';
import {MyVerticallyCenteredModal} from './Models'

// Alert
import Alert from '../alert';

// Image Carousle
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Firebase
import {db, storage} from '../../secure/firebase'
import firebase from 'firebase';

export default function Viewer({ratioStyle, change, decide, removeDiv, dragged, resized,  bgc, bgi, usr, tryList, setcontext, usrpos, dis, usrsize, intervalperiod, setnewFile, transitionTime, axis, setMaster, fromView}){

  const [panel, setPanel] = React.useState(false)
  const [eachD, setEachD] = React.useState({})

  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)

  const [count, setCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  const [msg, setMsg] = React.useState("")

  const ref = useRef(null);

  useEffect(() => {

  }, [tryList])

  const handleClick = () => {
    ref.current.handleShow();
};

  async function mergeAndPush(e, data){
    const snapshot = await db.collection(usr).doc(dis).get()
    if(snapshot.data()){
      if(Object.keys(snapshot.data()).indexOf(data.id) !== -1){
        Object.keys(snapshot.data()).map(each => {
          if(data.id === each){
            setLoading(true)
            let imgurl = snapshot.data()[each].imageURL;
            let prefix = new Date().getTime();
            const uploadTask = storage.ref(`${usr}/${prefix + e.target.files[0].name}`).put(e.target.files[0]);
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
                    .ref(usr)
                    .child(prefix + e.target.files[0].name)
                    .getDownloadURL()
                    .then(url => {
                        imgurl.push(url)
                        if(dis && usr){
                          db.collection(usr).doc(dis).update({
                            [data.id]:{
                              timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                              size: {
                                  width: data.size.width,
                                  height: data.size.height
                              },
                              position: {
                                  x: data.position.x,
                                  y: data.position.y
                              },
                              imageURL: imgurl,
                              fileType: data.fileType,
                              texts: data.texts,
                              id: data.id,
                              interval: data.interva1 ? data.interva1 : 1.5,
                              transitionTime: data.transitionTime ? data.transitionTime : 3.5,
                              axis: data.axis ? data.axis : 'horizontal',
                            }
                          },{ merge: true })
                        }
                        setnewFile(snapshot.data()[each], url);
                        setLoading(false)
                    }
                  )
                }
              )
          }
        })
      }else {
        fromView("hereView")
        setLoading(false)
        mergeAndPush(e, data)
      }
    }else{
      fromView("hereView")
      setLoading(false)
      mergeAndPush(e, data)
    }
  }

  function setIntervalPeriod(givenInterval, data){
    intervalperiod(data, givenInterval);
  }

  function counter(list){
    if(list.length-1 > count){
      setCount(count+1)
    }else{
      setCount(0)
    }
  }

  function handleLoop(selectedFile){
    if (selectedFile.imageURL){
      return(
        selectedFile.imageURL.map(each => {
          return(
            <div style={{width: selectedFile.size.width/decide , height: selectedFile.size.height/decide }} >
              <img alt="" src={each} style={{width: selectedFile.size.width/decide , height: selectedFile.size.height/decide }} />
            </div>
          )
        })
      )
    }
  }

  function selectTag(post){
    if(post.texts !== ""){
      return  (
        <div style={{width: post.size.width/decide , height: post.size.height/decide }} className="img" >
          <Textfit
            mode="multi"
            style={{height: "100%", border: "1px solid black"}}
            forceSingleModeWidth={false}>
            {ReactHtmlParser(post.texts)}
          </Textfit>
        </div>
      )
    }
    else if(post.fileType === "image/png" || post.fileType === "image/PNG" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/gif" ){
      return (
        <Carousel
          style={{ width: post.size.width/decide , height: post.size.height/decide }}
          interval = { post.interval ? post.interval * 1000 : 1000 }
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          showThumbs={false}
          useKeyboardArrows={false}
          autoPlay={true}
          stopOnHover={true}
          swipeable={true}
          dynamicHeight={true}
          emulateTouch={true}
          swipeScrollTolerance="5"
          transitionTime= { post.transitionTime ? post.transitionTime  * 100 : 500 }
          axis= { post.axis ? post.axis : "horizontal" }
        >
          {handleLoop(post)}
        </Carousel>
      )
    }
    else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
      return(
        <video
          style={{width: "100%", height: "100%", border: "none"}}
          className="img"
          autoPlay={true}
          controls={false}
          loop={post.imageURL.length === 1 ? true : false}
          type={post.fileType}
          src={post.imageURL[count]}
          onEnded={() => {counter(post.imageURL)}}
        />
      )
    }
  }

  function handleSizePosition(each, e, direction, ref, delta, position){
    const changeW= Number((ref.style.width).slice(0,-2))
    const changeH= Number((ref.style.height).slice(0,-2))
    resized(ref,each)
    dragged(each,e,position)
    setWidth(changeW*decide)
    setHeight(changeH*decide)
  }

  function handleDrag(each,e,d){
    dragged(each,e,d);
    setX(d.x*decide)
    setY(d.y*decide)
  }
  
  function openPanel(each){
    setPanel(true);
    setEachD(each)
    setWidth(each.size.width)
    setHeight(each.size.height)
    setX(each.position.x)
    setY(each.position.y)
  }

  function send(){
    if(width === 0 &&  height === 0 &&  x === 0 &&  y ===0){ 
      setMaster(eachD, eachD.position.x, eachD.position.y, eachD.size.width, eachD.size.height)
      console.log(eachD, eachD.position.x, eachD.position.y, eachD.size.width, eachD.size.height)
    }else{
      usrsize(eachD, width, height)
      usrpos(eachD, x, y)
    }
    setPanel(false);
  }

  return (
    <div>
      <Ratio className="auth-inner" className="layout" ratio={ ratioStyle.w / ratioStyle.h } style={{ border: "2px solid black", maxHeight: "inherit", backgroundPosition: 'center', background: bgi !=="" ? `url(${bgi})`: bgc.background ,backgroundSize: 'cover',overflow: 'hidden',backgroundRepeat  : 'no-repeat'}}  id="main" >
          {
            tryList.map(each => {
              return(
                  <Rnd
                      className="SelectedTemp img grid"
                      key={each.id}
                      id={each.id}
                      bounds='parent'
                      size={{ width:each.size.width/decide, height: each.size.height/decide }}
                      position={{ x: each.position.x/decide, y: each.position.y/decide }}
                      onResizeStop={(e, direction, ref, delta, position) =>{handleSizePosition(each, e, direction, ref, delta, position)}}
                      onDragStop={(e,d)=>handleDrag(each,e,d)}
                      onDoubleClick={(e) => {removeDiv(each, e)}}
                      onContextMenu = {(e) => {e.preventDefault(); openPanel(each);}}
                    >
                    {selectTag(each)}
                  </Rnd>
              )
          })
        }
      </Ratio>
      {tryList.length !== 0 ? 
        <MyVerticallyCenteredModal doing={loading} setDoing={setLoading} MaP={mergeAndPush} SIP={setIntervalPeriod} SIT={transitionTime} SIA={axis} user={usr} show={panel} data={eachD} width={setWidth} height={setHeight} x={setX} y={setY} pixels={eachD.size} position={eachD.position} setShows={()=>{setPanel(false)}} sender={send} />      
      : null}
      <Alert className="alert" message={msg} ref={ref} />
    </div>
  )
}
  