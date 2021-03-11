import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {db} from '../secure/firebase'

export default function Home({pather, customTemp,accName, display, setdisplay, cleaner, settemp, setBGC, setBGI, bgc, bgi}) {

    const bgImage = "https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"

    React.useEffect(() => {
        if(accName){
            fetchTemplates();
        }
        else{
            window.location = "#/"
        }
    }, [])

    async function fetchTemplates(){
        if(accName){
            const snapshot = await db.collection(accName).doc("templates").get();
            if(snapshot.data()){
                settemp(snapshot.data())
            }
        }
        if(bgc === "" && bgi === ""){
            setBGC(bgc);
            setBGI(bgi);
        }
    }

    return (
        <div className="outer">
            <div className="middle" style={{backgroundImage: `url(${bgImage})`}}>
                <div className="auth-inner" style={{alignItems: "left"}}>
                    <Row>
                        <Col>
                            <button type="button" title="Click to Start Design" className="btn btn-outline-primary btn-circle btn-xl" onClick={pather}><i className="fa fa-object-group"></i></button>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "1em"}}>
                        <Col>
                            <Button className="homeButton" title="Create your own Template" onClick={() => {window.location = "#/newTemplate"}}> Create Template</Button>
                        </Col>
                        <Col>                                                
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="ie: display1" title="Select Display Name" value={display} onChange={(e)=> {setdisplay(e.target.value)}} />
                            </div>
                        </Col>
                        <Col>
                            <Button className="homeButton" title="Work on Existing Template" onClick={() => {customTemp !== "" ? window.location = "#/customDesign" : window.location="#/resolution"}}> Exisiting Template</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{margin: "1em"}}>
                            <Button className="homeButton" title="View Last Content" onClick={() => {window.location = "#/finalPreview"}}>Last Content</Button>
                        </Col>
                        <Col style={{margin: "1em"}}>
                            <Button className="homeButton" variant="btn btn-outline-danger" title="Clear Display" onClick={cleaner}>Clear Display</Button>
                        </Col>
                        <Col style={{margin: "1em"}}>
                            <Button className="homeButton" title="freeTemplate" onClick={() => {window.location="#/freestyle"}}>Free Style</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
