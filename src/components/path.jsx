import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'

// Cloud
import {db} from '../secure/firebase'

export default function Path({setexist, user}) {

  const [id, setId] = React.useState([])

  useEffect(() => {
    async function fetchData() {
      await getMarker().then(res => {setId(res)})
    }
    fetchData();
  }, [])

  const handleDesignExist = async() => {
    if(id.length !== 0){
      setexist(true)
      window.location = '#/freestyle'
    }
    else{
      handleDesignNot()
    }
  }

  const handleDesignNot=() => {
    if(id !== []){
      id.map(each => cleaner(each))
      setexist(true)
      window.location = '#/design'
    } 
  }

  const cleaner = async(each) => {
    db.collection(user).doc(each).delete()
  }

  const getMarker = async() => {
    const snapshot = await db.collection(user).get()
    return snapshot.docs.map(doc => doc.id);
  }

    return (
      <div className="outer">
        <div className="middle">
            <div className="auth-inner">
            <Button className="homeButton" variant="outline-success" style={{margin: '1em'}} onClick={handleDesignExist} >Custom Design</Button>
            <Button className="homeButton" variant="outline-primary" style={{margin: '1em'}} onClick={handleDesignNot} >Master Templates</Button>
            </div>
          </div>
        </div>
    )
}
