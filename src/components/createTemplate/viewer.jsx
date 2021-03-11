import React from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd'

export default function Viewer({ratioStyle, change, decide, removeDiv, dragged, resized}){

  function selectTag(post){
    if(post.texts !== ""){
      return <div className="editorValue" dangerouslySetInnerHTML={{__html: post.texts}}  />
    }
    else if(post.fileType === "image/png" || post.fileType === "image/PNG" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/gif" ){
      return <img draggable="false" src={post.imageURL} alt="" />
    }
    else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
      return <video src={post.imageURL} loop={true} autoPlay={true} alt="" />
    }
  }

  function handleSizePosition(each, e, direction, ref, delta, position){
    resized(ref,each)
    dragged(each,e,position)
  }

  return (
      <Ratio className="auth-inner" className="layout" ratio={ ratioStyle.w / ratioStyle.h } style={{ border: "2px solid black", maxHeight: "inherit", backgroundPosition: 'center',backgroundSize: 'cover',overflow: 'hidden',backgroundRepeat  : 'no-repeat'}}  id="main" >
          {change.map(each => {
              return(
                  <Rnd
                      className="SelectedTemp img grid"
                      key={each.id}
                      id={each.id}
                      bounds='parent'
                      default={{x: each.position.x/decide, y: each.position.y/decide, width: each.size.width/decide, height: each.size.height/decide }}
                      onResizeStop={(e, direction, ref, delta, position) =>{handleSizePosition(each, e, direction, ref, delta, position)}}
                      onDragStop={(e,d)=>dragged(each,e,d)}
                      onDoubleClick={(e) => {removeDiv(each, e)}}
                  >
                    {selectTag(each)}
                  </Rnd>
              )
          })}
      </Ratio>
  )
}
