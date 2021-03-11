import React,{ useEffect } from 'react';
import FSTemplate from './FS Template';
import {Button} from 'react-bootstrap';

// Components
import Template from '../template'
import Progress from 'react-progressbar';
import { Rnd } from 'react-rnd'

// StyleSheet
import './template.css'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';


// Components
import Done from '../done';
import { Temp1, Temp2, Temp3, Temp4, Temp5, Temp6 } from './tempData';

// Firestore
import firebase from 'firebase';
import {storage, db} from '../../secure/firebase'

export default function Design({exists, setexist, template, ratios, user, allData, settmp, reloader, display}){

    const [data, setData] = React.useState(Temp2)
    const [upload, setUpload] = React.useState(0)

    const [temp, setTemp] = React.useState(false)
    const [dragpoint, setDragpoint] = React.useState(true)

    var value = handleSize()
    var templatesize = handletemp()

    const [templateNum, setTemplateNum] =React.useState(1)

    useEffect(() => {
        if(ratios.h > ratios.w){
            window.location = "#/resolution"
        }
        else{
            setData(Temp1)
        }
        changeTemplate()
      },[exists, setexist, templateNum]);

      const IOSSwitch = withStyles((theme) => ({
        root: {
          width: 50,
          height: 20,
          padding: 0,
          margin: theme.spacing(1),
        },
        switchBase: {
          padding: 1,
          '&$checked': {
            transform: 'translateX(30px)',
            color: theme.palette.common.white,
            '& + $track': {
              backgroundColor: '#2c73d9',
              opacity: 1,
              border: 'none',
            },
          },
          '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
          },
        },
        thumb: {
          width: 18,
          height: 18,
        },
        track: {
          borderRadius: 26 / 2,
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[50],
          opacity: 1,
          transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
      }))(({ classes, ...props }) => {
        return (
          <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            {...props}
            style={{fontFamily: "'Raleway', sans-serif", alignSelf: "center"}}
          />
        );
      });

    function reset(){
        var checkTemp = [Temp1, Temp2, Temp3, Temp4, Temp5, Temp6]
        setData(checkTemp[templateNum])
    }

    function changeTemplate(){
        var checkTemp = [Temp1, Temp2, Temp3, Temp4, Temp5, Temp6]
        setData(checkTemp[templateNum])
    }

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

    // Handle Sizes
    function handleSize(){
        if(window.innerWidth <= 1366){
            if(ratios.w === 1366 && ratios.h === 768){
            return(3)
            }else if(ratios.w === 768 && ratios.h === 1366) {
            return(2.5)
            }else if(ratios.w === 1920 && ratios.h === 1080){
            return(3)
            }else if(ratios.w === 1080 && ratios.h === 1920){
            return(3.5)
            }else if(ratios.w === 3840 && ratios.h === 2160){
            return(5.5)
            }else if(ratios.w === 2160 && ratios.h === 3840){
            return(6.5)
            }else if(ratios.w === 7680 && ratios.h === 4320){
            return(11)
            }else if(ratios.w === 4320 && ratios.h === 7680){
            return(12.5)
            }
        }
        else if(window.innerWidth <= 1600){
            if(ratios.h === 768 && ratios.w === 1366){
            return(1.5)
            }else if(ratios.h === 1366 && ratios.w === 768){
            return(2)
            }else if(ratios.h === 1080 && ratios.w === 1920){
            return(2.5)
            }else if(ratios.h === 1920 && ratios.w === 1080){
            return(3.5)
            }else if(ratios.h === 2160 && ratios.w === 3840){
            return(4.5)
            }else if(ratios.h === 3840 && ratios.w === 2160){
            return(5.5)
            }else if(ratios.h === 4320 && ratios.w === 7680){
            return(9)
            }else if(ratios.h === 7680 && ratios.w === 4320){
            return(10)
            }
        }
        else if(window.innerWidth <= 1920){
            if(ratios.h === 768 && ratios.w === 1366){
            return(1)
            }else if(ratios.h === 1366 && ratios.w === 768){
            return(1.5)
            }else if(ratios.h === 1080 && ratios.w === 1920){
            return(2)
            }else if(ratios.h === 1920 && ratios.w === 1080){
            return(2.5)
            }else if(ratios.h === 2160 && ratios.w === 3840){
            return(4.5)
            }else if(ratios.h === 3840 && ratios.w === 2160){
            return(5.5)
            }else if(ratios.h === 4320 && ratios.w === 7680){
            return(9)
            }else if(ratios.h === 7680 && ratios.w === 4320){
            return(10)
            }
        }
    }

    function resized(ref,each){
        var temp = data[each]
        const changeW= Number((ref.style.width).slice(0,-2))
        const changeH= Number((ref.style.height).slice(0,-2))
        temp.size.width = changeW*value/templatesize;
        temp.size.height = changeH*value/templatesize;
        setData({...data, [each]:temp})
    }

    function dragged(each,e,d){
        var temp = data[each]
        temp.position.x = d.x*value/templatesize;
        temp.position.y = d.y*value/templatesize;
        setData({...data, [each]:temp})
    }

    function addText(txt, each){
        var temp = data[each]
        temp.texts = txt;
        temp.fileType='text'
        temp.file = {}
        temp.imageURL=''
        setData({...data, [each]:temp})
    }

    function addFile(img, each, fileO){
        var temp = data[each]
        temp.imageURL = [img];
        temp.texts = '';
        temp.file = fileO
        temp.fileType = fileO.type
        setData({...data, [each]:temp})
    }

    function setID(id, each){
        var temp = data[each]
        temp.id = id;
        setData({...data, [each]:temp})
    }

    function userPixel(each, width, height){
        var temp = data[each]
        temp.size.width = width;
        temp.size.height = height;
        setData({...data, [each]:temp})
    }

    function userPosition(each, x, y){
        var temp = data[each]
        temp.position.x = x;
        temp.position.y = y;
        setData({...data, [each]:temp})
    }

    function masterHandler(each, x, y, width, height){
        var temp = data[each]
        temp.position.x = x;
        temp.position.y = y;
        temp.size.width = width;
        temp.size.height = height;
        setData({...data, [each]:temp})
    }

    const getDownload = () => {
        if(Object.keys(data).length !== 0){
            Object.keys(data).map(each =>{
                clearCloud()
                    if(data[each].id !== ''){
                        if(!data[each].file.name){
                            db.collection(user).doc(display).set({
                                [each] : {
                                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                size: {
                                    width: data[each].size.width,
                                    height: data[each].size.height
                                },
                                position: {
                                    x: data[each].position.x,
                                    y: data[each].position.y
                                },
                                imageURL: [data[each].imageURL],
                                fileType:  data[each].fileType,
                                texts: data[each].texts,
                                id: each
                            }
                            }, { merge: true })
                            console.log("File Empty")
                        }
                        else if(data[each].texts !== ""){
                            db.collection(user).doc(display).set({
                                [each] : {
                                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                size: {
                                    width: data[each].size.width,
                                    height: data[each].size.height
                                },
                                position: {
                                    x: data[each].position.x,
                                    y: data[each].position.y
                                },
                                imageURL: [data[each].imageURL],
                                fileType: 'text',
                                texts: data[each].texts,
                                id: each
                            }
                        }, { merge: true })
                            console.log("text not Empty")
                        }
                        else{
                            let prefix = new Date().getTime()
                            const uploadTask = storage.ref(`${user}/${ prefix + data[each].file.name}`).put(data[each].file);
                            uploadTask.on(
                                "state_changed",
                                (snapshot) => {
                                    //prograss Bar Math
                                    const progressCount = Math.round(
                                        snapshot.bytesTransferred/ snapshot.totalBytes * 100
                                    );

                                    setUpload(progressCount)
                                },
                                (error) => {
                                    console.log(error);
                                    alert(error.message)
                                },
                                ()=> {
                                    storage
                                        .ref(user)
                                        .child(prefix + data[each].file.name)
                                        .getDownloadURL()
                                        .then(url =>{
                                            db.collection(user).doc(display).set({
                                                [each] : {
                                                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                                    size: {
                                                        width: data[each].size.width,
                                                        height: data[each].size.height
                                                    },
                                                    position: {
                                                        x: data[each].position.x,
                                                        y: data[each].position.y
                                                    },
                                                    imageURL: [url],
                                                    fileType: data[each].file.type,
                                                    texts: data[each].texts,
                                                    id: each
                                                }
                                            }, { merge: true })
                                        })
                                    }
                                )
                                console.log("File and Text")
                            }
                    }
                    else if(data[each].texts !== ""){
                        // post it in Db
                        db.collection(user).doc(display).set({
                          [each] : {
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            size: {
                                width: data[each].size.width,
                                height: data[each].size.height
                            },
                            position: {
                                x: data[each].position.x,
                                y: data[each].position.y
                            },
                            imageURL: [data[each].imageURL],
                            fileType: 'text',
                            texts: data[each].texts,
                            id: each
                          }
                        }, { merge: true })
                        .then(function(docRef) {
                            setID(each, each)
                        });
                        console.log("text")
                    }
                    else if(data[each].id == ""){
                        if(data[each].file.name){
                            let prefix = new Date().getTime()
                            const uploadTask = storage.ref(`${user}/${ prefix + data[each].file.name}`).put(data[each].file);
                            uploadTask.on(
                                "state_changed",
                                (snapshot) => {
                                    //prograss Bar Math
                                    const progressCount = Math.round(
                                        snapshot.bytesTransferred/ snapshot.totalBytes * 100
                                    );

                                    setUpload(progressCount)
                                },
                                (error) => {
                                    console.log(error);
                                    alert(error.message)
                                },
                                ()=> {
                                    storage
                                        .ref(user)
                                        .child( prefix + data[each].file.name)
                                        .getDownloadURL()
                                        .then(url =>{
                                          db.collection(user).doc(display).set({
                                            [each] : {
                                                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                                                size: {
                                                    width: data[each].size.width,
                                                    height: data[each].size.height
                                                },
                                                position: {
                                                    x: data[each].position.x,
                                                    y: data[each].position.y
                                                },
                                                imageURL: [url],
                                                fileType: data[each].file.type,
                                                texts: data[each].texts,
                                                id: each
                                              }
                                            }, { merge: true })
                                            .then(function(docRef) {
                                                setID(each, each)
                                            })
                                        }
                                    )
                                }
                            )
                            console.log("New Upload")
                        }
                    }
                }
            )
        }
       window.location="#/finalPreview"
    }

    const clearCloud = () => {
        async function fetchData(){
            const snapshot = await db.collection(user).doc(display).get();
            const data = snapshot.data();
            if(data){
                Object.keys(data).map(each => {
                    deleteTemp(each)
                })
            }
        }
        fetchData();
        setData(Temp2);
        setexist(false)
    }

    function deleteTemp(e){
        db.collection(user).doc(display).update({
            [e]: firebase.firestore.FieldValue.delete()
          })
    }

    const cleaner = async(each) => {
        await db.collection(user).doc(each).delete()
    }

    function handleSizePosition(each, e, direction, ref, delta, position){
      resized(ref,each)
      dragged(each,e,position)
    }

    return (
        <div className="outer" style={{backgroundColor: "rgb(128,128,128,0.7)"}}>
            <div className="centerer">
                <div className="auth-inner-setting" style={{backgroundColor: "rgb(128,128,128,0.7)", borderRadius: "10px"}}>
                    <div className='main-container' style={{width : ratios.w/value, height: ratios.h/value, overflow: "hidden"}}>
                        {data ?
                            Object.keys(data).map(each => {
                                return(
                                    <Rnd
                                        className="SelectedTemp grid"
                                        bounds='parent'
                                        size={{
                                            width: Number((data[each].size.width / value)) * Number(templatesize),
                                            height: Number((data[each].size.height / value)) * Number(templatesize)
                                        }}
                                        position={{
                                            x: Number((data[each].position.x / value) * templatesize),
                                            y: Number((data[each].position.y / value) * templatesize)
                                        }}
                                        onResizeStop={(e, direction, ref, delta, position) =>{handleSizePosition(each, e, direction, ref, delta, position)}}
                                        onDragStop={(e,d)=>dragged(each,e,d)}
                                        disableDragging={dragpoint}
                                    >
                                        <FSTemplate drags={setDragpoint} mngFile={addFile} mngTxt={addText} values={value} tmpSize={templatesize} setMaster={masterHandler} setpixs={userPixel} setpos={userPosition} obj={each} datas={data[each]} accName={user} />
                                    </Rnd>
                                )
                            })
                        : null}
                    </div>
                    <Progress completed={upload} style={{borderRadius: "10px", backgroundColor: "#0000"}} />
                    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: "2em"}} >
                        <Button className="homeButton" variant="btn btn-success" onClick={getDownload}>Upload & Preview</Button>
                        <Button className="homeButton" variant="btn btn-dark" onClick={reset} >Reset</Button>
                        <FormControlLabel
                            className="Label"
                            style={{fontSize: "1em"}}
                            control={<IOSSwitch checked={!dragpoint} onChange={()=>{setDragpoint(!dragpoint)}} name="checkedB" />}
                            label="Draggable"
                        />
                        <Button className="homeButton" variant="btn btn-dark" type="button" onClick={()=>setTemp(true)} >Template</Button>
                        {/* <Button className="homeButton" variant="btn btn-dark" onClick={clearCloud}  disabled={ratios.w < ratios.h ? true : false} >Clear</Button> */}
                        <Button className="homeButton" variant="btn btn-danger" onClick={()=>{window.location="#/home"}} >Back</Button>
                    </div>
                    <Template tmp={temp} setTmp={setTemp} tempNum={setTemplateNum} setNow={changeTemplate} />
                </div>
            </div>
        </div>
    )
}
