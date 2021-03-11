import React,{useState, useEffect, useRef} from 'react';

// Component
import Template from './template';
import Alert from './alert';

// Style
import {Form, Row, Col, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";

// Icon Handle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// firebase
import firebase from 'firebase';
import {db} from '../secure/firebase'
import { WarningSharp } from '@material-ui/icons';

const Resolution = ({setratios, settemp, ratios, setexist, reloader, user, setTemplate, allData, display}) => {

    const [temp, setTemp] = useState(false)
    const [chose, setChose] = useState(false)
    const [msg, setMsg] = useState("")
    const [listElement, setListElement] = useState([])

    let history = useHistory();

    const ref = useRef(null);

    useEffect(() => {
        fetchData()
    }, [])

    const swap = () => {
        setChose(!chose)
        setratios([{w: ratios.h, h: ratios.w}])
    }

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
          />
        );
      });

    function handlePreAdded(){
        window.location = "#/design"
        clearCloud();
    }

    const clearCloud = async() => {
        const snapshot = await db.collection(user).doc(display).get();
        Object.keys(snapshot.data()).map(each => {
            deleteContent(each)
        })
    }

    function deleteContent(e){
        db.collection(user).doc(display).update({
            [e]: firebase.firestore.FieldValue.delete()
        })
    }

    async function fetchData(){
        if(user){
            const snapshot = await db.collection(user).doc("templates").get();
            const data = snapshot.data();
            if(data){
                setListElement(Object.keys(data).sort())
            }
        }
        else{ 
            window.location = "#/"
        }
    }

    const MakeItem = function(X) {
        return <div style={{display:"flex"}} >
                    <Dropdown.Item key={X} value={X} onClick={() => {setTemplate(X); window.location = "#/customDesign"} } >{X}</Dropdown.Item>
                    <FontAwesomeIcon onClick={() => deleteTemp(X)} className="tashButton" icon={faTrash}  style={{margin: "0.5em"}} />
                </div>
    };

    function reloadPage(){
        window.location = "#/freestyle"
    }

    function deleteTemp(e){
        let arr = listElement.filter(each => each !== e);
        setListElement(arr)
        db.collection(user).doc("templates").update({
            [e]: firebase.firestore.FieldValue.delete()
        })
    }

    function popupChecker(){
        if(ratios.w > ratios.h){
            handlePreAdded();
        }else{
            // console.log("Popup")
            setMsg("Sorry, Our Templates Only Available for Landscape Displays")
            ref.current.handleShow();
        }
    }

    const checker = () => {
        return(
            <form>
                <div className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center text-center">
                    <div className="col-auto">
                        <Row>
                            <Col>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Width</div>
                                    </div>
                                    <input type="text" maxLength="4" className="form-control" id="inlineFormInputGroup" placeholder={`${ratios.w}`} onChange={(e)=>setratios([{...ratios,w:Number(e.target.value)}])} />
                                </div>
                            </Col>
                            <Col>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Height</div>
                                    </div>
                                    <input type="text" maxLength="4" className="form-control" id="inlineFormInputGroup" placeholder={`${ratios.h}`} onChange={(e)=>setratios([{...ratios,h:Number(e.target.value)}])} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <Form.Group controlId="formGridState"  onChange={(e) =>  setratios([JSON.parse(e.target.value)])} >
                                <Form.Control as="select" defaultValue="Choose..." >
                                    <option style={{display: "none"}} >Select Resolution</option>
                                    <option value='{"w": 1366, "h": 768}' >HD</option>
                                    <option value='{"w": 1920, "h": 1080}' >Full HD</option>
                                    <option value='{"w": 3840, "h": 2160}' >4K</option>
                                    <option value='{"w": 7680, "h": 4320}' >8K</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <DropdownButton className="homeButton" id="dropdown-item-button" variant="outline-dark" title="Own Template">
                                {listElement.length !==0 ? listElement.map(MakeItem) :  <Dropdown.Item onClick={() => {window.location ="#/newTemplate"}}>Create Own Templates</Dropdown.Item>}
                            </DropdownButton>
                        </Col>
                    </Row>
                    <div className="col-auto flex" style={{justifyContent: "space-around"}}>
                        <Button className="homeButton" variant="outline-success" type="button"  onClick={popupChecker}> Master Template </Button>
                        <Button className="homeButton" variant="outline-danger" type="button"  onClick={() => {window.location="#/home"}}> Back </Button>
                        <Button className="homeButton" variant="outline-primary" type="button"  onClick={reloadPage} >Custom Design</Button>
                    </div>
                </div>
            </form>
        )
    }

    return(
        <div className="outer">
            <div className="middle">
                <div className="auth-inner">
                    {checker()}
                    <Template tmp={temp} setTmp={setTemp} setTemplate={settemp} />
                    <Alert message={msg} ref={ref} />
                </div>
            </div>
        </div>
    )
}

export default Resolution;
