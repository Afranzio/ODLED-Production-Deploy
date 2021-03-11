import React from 'react'
import {Rnd} from 'react-rnd'

export default function MultipleVideos({selectedVideo}){
  const [count, setCount] = React.useState(0)

  function counter(){
    if(selectedVideo.length-1 > count){
      setCount(count+1)
    }else{
      setCount(0)
    }
  }

  return(
    <div>
      {selectedVideo.length !== 0 ?
        <video
          style={{width: "100%", height: "100%", border: "none"}}
          autoPlay={true}
          controls={false}
          loop={selectedVideo.length === 1 ? true : false}
          type="video/*"
          src={selectedVideo[count]}
          onEnded={counter}
          />
      : null}
    </div>
  )
}
