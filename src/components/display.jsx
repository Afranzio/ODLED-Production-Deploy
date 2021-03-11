import React,{useEffect} from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd'

// firestore
import firebase from 'firebase'
import {db} from '../secure/firebase';


export default function Display(){

    const [items, SetItems] = React.useState([])

    const accName="tom2@xyz.com"

    useEffect(() => {
        if(accName){
            db.collection(accName).orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                SetItems(
                snapshot.docs.map((doc) => ({
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    id: doc.id,
                    post: doc.data(),
                }))
                );
            });
        }
    }, [])

    function selectTag(post){
        if(post.texts !== ""){  
        return <div className="wTable" dangerouslySetInnerHTML={{__html: post.texts}} style={{width: post.size.w, height: post.size.h}} />
        }
        else if(post.fileType === "image/png" || post.fileType === "image/PNG" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/gif" ){
        return <img src={post.imageURL} style={{width: post.size.w, height: post.size.h}}  alt="" />
        }
        else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
        return <video src={post.imageURL} style={{width: post.size.w, height: post.size.h}} loop={true} autoPlay={true} alt="" />
        }
        else if(post.fileType === "application/pdf"){
        return <iframe src={post.imageURL+'#toolbar=0&scrollbar=1&navpanes=0'} type={post.fileType} title={post.fileName} scrolling="no" height={post.size.h} />
        }
    }

    return (
        <Ratio ratio={ window.innerWidth / window.innerHeight } style={{ border: "2px solid black", maxHeight: "inherit", backgroundPosition: 'center',backgroundSize: 'cover',overflow: 'hidden',backgroundRepeat  : 'no-repeat'}}  className="layout" id="main" >
            {(items !== 0)? 
            items.map(({id,post}) => (
                <Rnd id={id} key={id} className="SelectedTemp img grid" 
                bounds="parent"
                size={{width: post.size.w, height: post.size.h}}
                position={{x: post.position.x, y: post.position.y}} >
                    {selectTag(post)}
                </Rnd>
            )) : null}
        </Ratio>
    )
}