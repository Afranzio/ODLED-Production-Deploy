// Modules
import React, {useState, useEffect} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import Home from './components/home'
import MiniDrawer from './components/sidebar'
import Design from './components/Design/design'
import Forgotpwd from './components/forgotpwd'
import Login from './components/login'
import Resolution from './components/resolution'
import Setting from './components/setting'
import Support from './components/support'
import CustomDesign from './components/Design/customDesign'
import Table from './components/custom/itemFirebase'
import FinalPreview from './components/finalPreview'
import CreateTemplate from './components/createTemplate/createTemplate'
import ModernCreate from './components/modernCustom-Testing/createTemplate'

// JointClimb
import JointClimb from './components/JointClimb/JointClimb'

// StyleSheets
import './App.css';

// Cloud
import firebase from 'firebase';
import {auth, db} from './secure/firebase';

function App(){

// States
    const [data, setData] = useState([])
    const [user, setUser] = useState('')
    const [ratio, setRatio] = useState([{w: 1366, h: 768}])
    const [temp, setTemp] = useState(1)
    const [exist, setExist] = useState(true)
    const [bgcolor, setBgcolor] = useState({background: '#fff'})
    const [bgimage, setBgImage] = useState("")
    const [templates, setTemplates] = useState({})
    const [displayName, setDisplayName] = useState("display1")

    const [customTemplates, setCustomTemplates] = useState("")

    const[skip, setSkip] = useState("")


    function handleSignOff(){
        auth.signOut()
        setUser('')
        window.location = "#/"
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user.email)
                setSkip(false)
                fetchData(user.email)
                fetchConfig(user.email)
            }
            else {
                setUser("")
                setSkip(true)
            }
          });
          if (user){
            fetchTemplates()
          }
          console.log("display-Controller")
          logTest();
    }, [user])

    const logTest = () => {
        if (user){
            window.location=`#/home`
        }
        else{
            window.location=`#/`
        }
    }

    const startPath = () => {
        if (user){
            window.location=`#/resolution`
        }
        else{
            window.location=`#/login`
        }
    }

    async function fetchData(usr){
        let tempDataList = []
        const snapshot = await db.collection(usr).doc(displayName).get();
        if(snapshot.data() !== null && snapshot.data() !== undefined ){
            Object.keys(snapshot.data()).sort().reverse().map(each => {
                tempDataList.push(snapshot.data()[each])
            })
            setData(tempDataList)
        }
    }

    async function fetchConfig(usr){
        const snapshot = await db.collection(usr).doc("configuration").get();
        const confData = snapshot.data()
        if(confData){
            setBgcolor(confData.bgColor)
            setBgImage(confData.bgImage)
            setRatio([confData.ratio])
        }
        else{
            if(user){
                db.collection(user).doc("configuration").set({
                    ratio: ratio["0"],
                    bgImage: "",
                    bgColor : bgcolor,
                    agreedToSend: false
                })
            }
        }
    }


    async function fetchTemplates(){
        const snapshot = await db.collection(user).doc("templates").get();
        setTemplates(snapshot.data())
    }

    function refreshPage(){
        window.location.reload(false);
    }

    const clearCloud = async() => {
        if(user && displayName){
            const snapshot = await db.collection(user).doc(displayName).get();
            if(snapshot.data()){
                Object.keys(snapshot.data()).sort().reverse().map(each => {
                    deleteContent(each)
                    deleteFromStorage(snapshot.data()[each])
                })
            }
            clearBG();
            setBgcolor({background : "#fff"})
            setBgImage("")
        }
        function clearBG(){
            if(user){
                db.collection(user).doc("configuration").update({
                    bgImage: "",
                    bgColor : {background : "#fff"},
                    agreedToSend : false
                })
            }
        }
    
    }

    function deleteFromStorage(each){
        if (each.imageURL !== "string"){
            each.imageURL.map(one => {
                firebase.storage().refFromURL(one).delete();
            })
        }else{
            firebase.storage().refFromURL(each).delete();
        }
    }

    function deleteContent(e){
        if(user){
            db.collection(user).doc(displayName).update({
                [e]: firebase.firestore.FieldValue.delete()
            })
        }
    }

    return (
        <Router>
            <div className="App" onContextMenu={(e) => e.preventDefault()} >
                <MiniDrawer style={{fontSize: "1em"}} loggingOff={handleSignOff} user={user} detail={skip} />
                <div style={{marginTop:"68px",marginLeft:"175px", padding:'15px'}}>
                    <Switch>
                        <Route exact path="/">
                            <Login setuser={setUser} reloader={refreshPage} />
                        </Route>
                        <Route path="/home">
                            <Home bgc={bgcolor} bgi={bgimage} setBGI={setBgImage} setBGC={setBgcolor} cleaner={clearCloud} setdisplay={setDisplayName} display={displayName} accName={user} pather={startPath} loc={logTest} customTemp={customTemplates} settemp={setTemplates} />
                        </Route>
                        <Route path="/forgotpwd" component={Forgotpwd} />
                        <Route path="/design" >
                            <Design display={displayName} reloader={refreshPage} setexist={setExist} settmp={setTemp} allData={data} exists={exist} template={temp} setratios={setRatio}  ratios={ratio[0]} user={user}  />
                        </Route>
                        <Route path="/customDesign" >
                            <CustomDesign cleaner={clearCloud} display={displayName}  setexist={setExist} settmp={setTemp} allData={customTemplates !== "" ? templates[customTemplates] : data} exists={exist} template={temp} setratios={setRatio}  ratios={ratio[0]} user={user} reloader={refreshPage}  />
                        </Route>
                        <Route path="/resolution">
                            <Resolution display={displayName} user={user} setTemplate={setCustomTemplates} allData={data} reloader={refreshPage} setexist={setExist} ratios={ratio[0]} setratios={setRatio} settemp={setTemp} user={user} BGC={bgcolor} setBGI={setBgImage} setBGC={setBgcolor} />
                        </Route>
                        {/* <Route path="/custom">
                            <Table allData={data} ratios={ratio[0]} BGC={bgcolor} setBGI={setBgImage} setBGC={setBgcolor} BGI={bgimage} setratios={setRatio} accName={user}  />
                        </Route> */}
                        <Route path="/setting">
                            <Setting setdisplay={setDisplayName} display={displayName} ratios={ratio[0]} setratios={setRatio} settemp={setTemp} user={user} logger={logTest} />
                        </Route>
                        <Route path="/support">
                            <Support />
                        </Route>
                        <Route path="/newTemplate">
                            <CreateTemplate display={displayName} user={user} selectedTemp={customTemplates} ratio={ratio[0]} reloader={refreshPage} />
                        </Route>
                        <Route path="/freestyle">
                            <ModernCreate display={displayName} allData={data} ratioNum={ratio[0]} BGC={bgcolor} setBGI={setBgImage} setBGC={setBgcolor} BGI={bgimage} setratios={setRatio} accName={user} reloader={refreshPage} />
                        </Route>
                        <Route path="/finalPreview">
                            <FinalPreview display={displayName} setexist={setExist} BGC={bgcolor} BGI={bgimage} ratios={ratio[0]} itemData={data} user={user} />
                        </Route>
                        <Route path="/testUnit" component={JointClimb} />
                        <Route path="" component={Error} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
