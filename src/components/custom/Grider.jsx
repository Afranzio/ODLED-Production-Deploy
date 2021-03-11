import React from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd';
import { MyVerticallyCenteredModal } from './Models';
import ReactHtmlParser from 'react-html-parser';
import { Textfit } from 'react-textfit';


export default function Grider({ratioStyle, change, removeDiv, dragged, resized, decide, bgc, bgi, acc }){

  const [view, setView] = React.useState(false)

  const [selectedId, setSelectedId] = React.useState("")

  function clickedBox(id){
    setSelectedId(id)
    setView(true)
  }

  function selectTag(post){
    if(post.texts !== ""){
      return  (<div style={{width: post.size.width/decide, height: post.size.height/decide}} >
                <Textfit
                  mode="multi"
                  style={{height: "100%"}}
                  forceSingleModeWidth={false}>
                  {ReactHtmlParser(post.texts)}
                </Textfit>
              </div>)
    }
    else if(post.fileType === "image/png" || post.fileType === "image/PNG" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/gif" ){
      return <img draggable="false" src={post.imageURL} alt="" style={{border: "0px"}} />
    }
    else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
      return <video src={post.imageURL} loop={true} autoPlay={true} alt="" style={{border: "0px"}} />
    }
  }

  function handleSizePosition(id, e, direction, ref, delta, position){
    // resized(id, ref, e);
    // console.log(e, delta, position)
    console.log(id);
  }

  return (
      <Ratio className="auth-inner" className="layout" ratio={ ratioStyle.w / ratioStyle.h } style={{ border: "1px solid black", maxHeight: "inherit",background: bgi !=="" ? `url(${bgi})`: bgc.background , backgroundPosition: 'center',backgroundSize: 'cover',overflow: 'hidden',backgroundRepeat  : 'no-repeat'}}  id="main" >
        {console.log(change)}
        {(Object.keys(change).length !== 0)?
          Object.keys(change).map(post => (
            <Rnd className="SelectedTemp img grid"
              bounds="parent"
              position={{
                x: Number(change[post].position.x/decide),
                y: Number(change[post].position.y/decide),
              }}
              size={{
                width: change[post].size.width/decide,
                height: change[post].size.height/decide
              }}
              onDragStop={(e,d)=>dragged(change[post].id,e,d)}
              onResizeStop={(e, direction, ref, delta, position) =>{handleSizePosition(change[post].id, e, direction, ref, delta, position)}}
              onDoubleClick={()=>removeDiv(change[post].id, change[post])}
              style={{ border: "1px solid black" }}
              >
                <MyVerticallyCenteredModal show={view} data={change[post]} ids={selectedId} setShows={() => setView(false)} accName={acc} />
                {selectTag(change[post])}
            </Rnd>
          )) : null}
      </Ratio>
  )
}
