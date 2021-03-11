import React from 'react'
import {Rnd} from 'react-rnd'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function MultipleImages({selectedFile}){

  function handleLoop(){
    if (selectedFile){
      return(
        selectedFile.map(each => {
          return(
            <div>
              <img alt="" src={each} />
            </div>
          )
        })
      )
    }
  }

  return(
    <div>
      {selectedFile ? selectedFile.length !== 0 ?
        <Carousel 
          interval = "1000"
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
          style={{width: "100%", height: "100%"}} >
          {handleLoop()}
        </Carousel>
      : null
    : null}
    </div>
  )
}
