import React from 'react'
import MultipleVideos from './multipleVideosLoop';
import MultipleImages from './multipleImagesLoad';
import { Rnd } from 'react-rnd';

export default function JointClimb() {

    const [imgList, setImgList] = React.useState([])
    const [vidList, setVidList] = React.useState([])

    function handle(e){
      let a = []
      let b = []
      Object.keys(e.target.files).map(each => {
          if(e.target.files[each].type === "image/png" || e.target.files[each].type === "image/jpeg" || e.target.files[each].type === "image/gif"){
            a.push(URL.createObjectURL(e.target.files[each]))
          }else{
            b.push(URL.createObjectURL(e.target.files[each]))
          }
      })
        setImgList(a)
        setVidList(b)
    }

    return (
        <div>
            <input type="file" multiple accept="image/*, video/*" onChange={(e) => {handle(e)}} />
            <Rnd size={{width: 500, height: 500}} position={{x: 100, y:50}}>
                <MultipleVideos selectedVideo={vidList} />
            </Rnd>
            <Rnd size={{width: 500, height: 500}} position={{x: 600, y:50}}>
                <MultipleImages selectedFile={imgList} />
            </Rnd>
        </div>
    )
}
