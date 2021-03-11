import React from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd'
import { Textfit } from 'react-textfit';
import ReactHtmlParser from 'react-html-parser';
import {MyVerticallyCenteredModal} from './Models'

export default function Viewer({ratioStyle, change, decide, removeDiv, dragged, resized,  bgc, bgi, tryList, usr, setcontext, usrpos, usrsize}){

  const [panel, setPanel] = React.useState(false)
  const [eachD, setEachD] = React.useState({})

  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)

  function selectTag(post){
    if(post.texts !== ""){
      return  (
        <div style={{width: post.size.width/decide , height: post.size.height/decide }} >
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
      return <img draggable="false" src={post.imageURL} alt="" />
    }
    else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
      return <video src={post.imageURL} loop={true} autoPlay={true} alt="" />
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
  }

  function send(){
    sendPos();
    sendsize();
    setPanel(false);
  }

  function sendPos(){
    usrpos(eachD, x, y)
  }

  function sendsize(){
    usrsize(eachD, width, height)
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
                      // onClick={setcontext(each)}
                      onContextMenu = {(e) => {e.preventDefault(); openPanel(each);}}
                    >
                    {selectTag(each)}
                  </Rnd>
              )
          })
        }
      </Ratio>
      {tryList.length !== 0 ? 
        <MyVerticallyCenteredModal user={usr} show={panel} data={eachD} width={setWidth} height={setHeight} x={setX} y={setY} pixels={eachD.size} position={eachD.position} setShows={()=>{setPanel(false)}} sender={send} />      
      : null}
    </div>
  )
}
  