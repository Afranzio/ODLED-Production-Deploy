import React,{useState, useEffect} from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd';
import ReactHtmlParser from 'react-html-parser';
import { Textfit } from 'react-textfit';

// Image Carousle
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// RB
import {Button} from 'react-bootstrap'
import {db} from '../secure/firebase'


export default function FinalPreview({ratios, setexist, user, BGC, BGI, display}){

    const [items, setItems] = useState({})
    const [count, setCount] = React.useState(0)

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData(){
        if(user && display){
            const snapshot = await db.collection(user).doc(display).get();
            if(snapshot.data()){
                setItems(snapshot.data())
            }
        }
    }

    let tempSize = handletemp()

    function handletemp(){
        if(ratios.w === 1366){
            return(1366/1366)
        }
        else if(ratios.w === 1920){
            return(1920/1366)
        }
        else if(ratios.w === 3840){
            return(3840/1366)
        }
        else if(ratios.w === 7680){
            return(7680/1366)
        }
    }

    let value = handleSize()
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
        else if (window.innerWidth >= 1366 && window.innerWidth <=1600){
        if(ratios.h === 768 && ratios.w === 1366){
            return (1.5)
        }else if(ratios.h === 1366 && ratios.w === 768){
            return (2.5)
        }else if(ratios.h === 1080 && ratios.w === 1920){
            return (2)
        }else if(ratios.h === 1920 && ratios.w === 1080){
            return (3.5)
        }else if(ratios.h === 2160 && ratios.w === 3840){
            return (4.5)
        }else if(ratios.h === 3840 && ratios.w === 2160){
            return (7)
        }else if(ratios.h === 4320 && ratios.w === 7680){
            return (8)
        }else if(ratios.h === 7680 && ratios.w === 4320){
            return (14)
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

    function handleLoop(selectedFile){
        if (selectedFile.imageURL){
          return(
            selectedFile.imageURL.map(each => {
              return(
                <div style={{width: selectedFile.size.width/value*tempSize , height: selectedFile.size.height/value*tempSize }} >
                  <img alt="" src={each} style={{width: selectedFile.size.width/value*tempSize , height: selectedFile.size.height/value*tempSize }} />
                </div>
              )
            })
          )
        }
      }

    function counter(list){
        if(list.length-1 > count){
            setCount(count+1)
        }else{
            setCount(0)
        }
    }

    function selectTag(post){
        if(post.texts !== ""){
        return  (<div style={{width: post.size.width/value*tempSize, height: post.size.height/value*tempSize}} >
                <Textfit
                  mode="multi"
                  style={{height: "100%"}}
                  forceSingleModeWidth={false}>
                  {ReactHtmlParser(post.texts)}
                </Textfit>
              </div>)
        }
        else if(post.fileType === "image/png" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/bmp" || post.fileType === "image/gif" ){
        return (
            <Carousel
              style={{width: post.size.width/value*tempSize , height: post.size.height/value*tempSize }}
              interval = {post.interval * 1000}
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
              transitionTime= { post.transitionTime ? post.transitionTime : 500 }
              axis= { post.axis ? post.axis : "horizontal" }
            >
              {handleLoop(post)}
            </Carousel>
          )
        }
        else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mov" || post.fileType === "video/webm"  || post.fileType === "video/mkv" ){
        return(
            <video
              style={{width: "100%", height: "100%", border: "none"}}
              autoPlay={true}
              controls={false}
              loop={post.imageURL.length === 1 ? true : false}
              type={post.fileType}
              src={post.imageURL[count]}
              onEnded={() => {counter(post.imageURL)}}
            />
          )
        }
        else if(post.fileType === "application/pdf"){
        return <iframe src={post.imageURL+'#toolbar=0&scrollbar=1&navpanes=0'} type={post.fileType} title={post.fileName} scrolling="no" height={post.size.h} />
        }
    }

    function returner(){
        window.location="#/freestyle"
    }

    function handleFinalSender(){
        setexist(true);
        db.collection(user).doc("configuration").update({
            agreedToSend: true
        })
        window.location="#/home"
    }

    function sendDisplay(){
        if(items){
            if(Object.keys(items).length !== 0 ){
                return(
                    <Ratio ratio={ratios.w / ratios.h} style={{  width: ratios.w/value ,height: ratios.h/value, border: "2px solid black", maxHeight: "inherit",background: BGI !== "" ? `url(${BGI})`: BGC.background , backgroundPosition: 'center',backgroundSize: 'cover',overflow: 'hidden',backgroundRepeat  : 'no-repeat'}}  className="layout" id="main" >
                        {( Object.keys(items).length !== 0 )?
                        Object.keys(items).map(post => (
                            <Rnd 
                            className="SelectedTemp grid"
                            bounds="parent"
                            disableDragging="true"
                            enableResizing="false"
                            size={{width: items[post].size.width/value*tempSize, height: items[post].size.height/value*tempSize}}
                            position={{x: items[post].position.x/value*tempSize, y: items[post].position.y/value*tempSize}} >
                                {selectTag(items[post])}
                            </Rnd>
                        )) : null}
                    </Ratio>
                )
            }else{
                return <div className="warning" style={{fontFamily: "'Quicksand', sans-serif"}} ><h4>Your Cloud May Empty Or Please Select Images to Upload</h4></div>
            }
        }else{
            return null
        }
    }

    return (
        <div className="outer" style={{paddingTop: "10vh"}}>
            {console.log(items)}
            <div className="fixedDisplay" style={{minHeight: "70vh"}} >
                <div className="centerer" >
                    <div className="changeDisplay" >
                        <div className="preview" >
                            {sendDisplay()}
                        </div>
                    </div>
                </div>
            </div>
            {Object.keys(items).length !== 0 ?
                <div style={{textAlign:"center", margin: "1em"}}>
                    <Button className="homeButton" variant="btn btn-outline-success customButton" onClick={handleFinalSender} style={{ margin: "1em 3em"}}>Send</Button>
                    <Button className="homeButton" variant="btn btn-outline-primary customButton" onClick={returner} style={{ margin: "1em 3em"}} >Edit</Button>
                    <Button className="homeButton" variant="btn btn-outline-primary customButton" onClick={fetchData} style={{ margin: "1em 3em"}} >Refresh</Button>
                    <Button className="homeButton" variant="btn btn-outline-danger customButton" onClick={()=>{window.location="#/home"}} style={{ margin: "1em 3em"}} >Cancel</Button>
                </div>
            :
                <div style={{textAlign:"center", margin: "1em"}}>
                    <Button className="homeButton" variant="btn btn-outline-primary customButton" onClick={()=>{window.location="#/home"}} style={{ margin: "1em 3em"}} >Return</Button>
                    <Button className="homeButton" variant="btn btn-outline-primary customButton" onClick={fetchData} style={{ margin: "1em 3em"}} >Refresh</Button>
                </div>
            }
        </div>
    )
}
