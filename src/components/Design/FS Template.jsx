import React from 'react';

// Styles and Models
import {MyVerticallyCenteredModal} from './Models';

// Text Fitness
import ReactHtmlParser from 'react-html-parser';
import { Textfit } from 'react-textfit';

// Image Carousle
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FSTemplate({datas, mngFile, mngTxt, obj, setpixs, tmpSize, drags, setcustom, accName, values, setpos, setMaster}) {

    const [view, setView] = React.useState(false)
    const [pick, setPick] = React.useState('')
    const [text, setText] = React.useState('')
    const [vid, setVid] = React.useState('')
    const [evn, setEvn] = React.useState()

    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)
  
    const [x, setX] = React.useState(0)
    const [y, setY] = React.useState(0)

    const [count, setCount] = React.useState(0)

    const onImageChange = (event) => {
        if (event){
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                  setPick(e.target.result);
                };
                reader.readAsDataURL(event.target.files[0]);
              }
        }
      }

    const forwarder = (event) => {
        if(event){
            if(event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/gif' ){
                onImageChange(event)
                setEvn(event.target.files[0])
            }
            else if(event.target.files[0].type === "video/mp4" || event.target.files[0].type === "video/avi" || event.target.files[0].type === "video/flv" || event.target.files[0].type === "video/mkv" ){
                setVid(URL.createObjectURL(event.target.files[0]))
                setEvn(event.target.files[0])
            }
        }
    }

    function counter(list){
        if(list.length-1 > count){
          setCount(count+1)
        }else{
          setCount(0)
        }
      }

    function handleLoop(selectedFile){
        if (typeof(selectedFile.imageURL) !== "string"){
          return(
            selectedFile.imageURL.map(each => {
              return(
                <div style={{width: selectedFile.size.width/values*tmpSize , height: selectedFile.size.height/values*tmpSize }} >
                  <img alt="" src={each} style={{width: selectedFile.size.width/values*tmpSize , height: selectedFile.size.height/values*tmpSize }} />
                </div>
              )
            })
          )
        }
      }

    const service = () => {
        if(datas){
            if(datas.texts !== '' && datas.fileType === 'text' && datas.imageURL === '' ){
                return  (
                  <div style={{width: datas.size.width/values*tmpSize, height: datas.size.height/values*tmpSize}} >
                    <Textfit
                      mode="multi"
                      style={{height: "100%"}}
                      forceSingleModeWidth={false}>
                      {ReactHtmlParser(datas.texts)}
                    </Textfit>
                  </div>
                )
            }
            else if(datas.imageURL !== "string"){
                if(datas.fileType === "image/png" || datas.fileType === "image/jpeg" || datas.fileType === "image/jpg" || datas.fileType === "image/gif"){
                    return (
                        <Carousel
                          style={{width: datas.size.width/values*tmpSize , height: datas.size.height/values*tmpSize }}
                          className="img"
                          interval = { datas.interval ? datas.interval * 1000 : 1000 }
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
                          transitionTime= { datas.transitionTime ? datas.transitionTime  * 100 : 500 }
                          axis= { datas.axis ? datas.axis : "horizontal" }
                        >
                          {handleLoop(datas)}
                        </Carousel>
                      )
                }
                else if(datas.fileType === "video/mp4" || datas.fileType === "video/avi" || datas.fileType === "video/flv" || datas.fileType === "video/mkv"){
                    return(
                        <video
                          style={{ width: datas.size.width/values*tmpSize , height: datas.size.height/values*tmpSize, border: "none", objectFit: "cover" }}
                          className="img"
                          autoPlay={true}
                          controls={false}
                          loop={datas.imageURL.length === 1 ? true : false}
                          type={datas.fileType}
                          src={datas.imageURL[count]}
                          onEnded={() => {counter(datas.imageURL)}}
                        />
                      )
                }
            }
        }
    }

    function send(){
        if(evn){
            if(text){
                mngTxt(text, obj)
                setText('')
            }
            else if(pick){
                mngFile(pick, obj, evn)
                setPick('')
            }
            else if(vid){
                mngFile(vid, obj, evn)
                setVid('')
            }
        }else{
            if(text){
                mngTxt(text, obj)
            }
        }
        sendPos();
        setView(false);
    }

    function sendPos(){
        if(width !== 0 || height !== 0){
            setpixs(obj, width, height)
        }
        else if (x !== 0 || y !==0){
            setpos(obj, x, y)
        }
        else{
            setMaster(obj, datas.position.x, datas.position.y, datas.size.width, datas.size.height)
        }
    }

    function viewsManual(){
        setView(true)
        drags(true)
    }

    return (
        <div className='Template' >
            <div className='SelectedTemp img' onContextMenu={viewsManual} >
                {service()} 
            </div>
            <MyVerticallyCenteredModal user={accName} show={view} data={datas} pixels={datas.size} position={datas.position} x={setX} y={setY} showTmpSize={tmpSize} evalu={values} width={setWidth} height={setHeight} setShows={()=>{setView(false)}} pickFile={forwarder} sender={send} textval={text} getText={setText} />
        </div> 
    )
}