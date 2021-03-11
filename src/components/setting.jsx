import React, {useState, useEffect} from 'react';

// RB
import {Button, Form, Row, Col} from 'react-bootstrap';

// Icon
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';

// Cloud
import {db} from '../secure/firebase';

export default function Setting({setratios, ratios, logger, setdisplay, display, user}) {

    const [width, setWidth] = useState(ratios.w)
    const [height, setHeight] = useState(ratios.h)
    const [chose, setChose] = useState(false)
    const [respond, setRespond] = useState(1)

    useEffect(() => {
        if(window.innerWidth >= 1920){
            setRespond(1.5)
        }
        else if (window.innerWidth <= 1366){
            setRespond(0.7)
        }
    }, [])

    const validatWid = (e) => {
        setratios([{...ratios,w:Number(e.target.value)}])
        setWidth(Number(e.target.value))
    }

    const validatHeight = (e) => {
        setratios([{...ratios,h:Number(e.target.value)}])
        setHeight(Number(e.target.value))
    }

    const validBoth = (e) => {
        setratios([e])
        setWidth(e.w)
        setHeight(e.h)
    }

    const swap = () => {
        setChose(!chose)
        setWidth(ratios.h)
        setHeight(ratios.w)
        setratios([{w: ratios.h, h: ratios.w}])
    }


    const finalPreview = () => {
        if(width > height){
            return({width: 455*respond,height: 265*respond})
        }
        else if(width === height){
            return({width: 265*respond,height: 265*respond})
        }
        else{
            return({width: 265*respond,height: 455*respond})
        }
    }

    function submitChanges(){
        if(user){
            db.collection(user).doc("configuration").update({
                ratio: {w: width, h:height}
            })
        }
        logger("#/login")
    }

    return (
        <div className="outer">
            <div className="middle">
                <div className="auth-inner-setting">
                        <Row>
                            <form className="fontHandle" onSubmit={(e) => e.preventDefault()}>
                                <div className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center text-center">
                                    <Col>
                                    <div className="col-auto">
                                        <Row>
                                            <Col>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Width</div>
                                                    </div>
                                                    <input type="text" maxlength="4" className="form-control" id="inlineFormInputGroup" value={ratios.w} placeholder={ratios.w} onChange={(e)=> validatWid(e)} />
                                                </div>  
                                                </Col>
                                                <Col>                                                
                                                    <div className="input-group mb-2">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">Height</div>
                                                        </div>
                                                        <input type="text" maxlength="4" className="form-control" id="inlineFormInputGroup" value={ratios.h} placeholder={ratios.h} onChange={(e)=> validatHeight(e)} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId="formGridState" onChange={(e) =>  validBoth(JSON.parse(e.target.value))} >
                                                        <Form.Control as="select" defaultValue="Choose..." >
                                                            <option value='{"w": 1366, "h": 768}' >HD</option>
                                                            <option value='{"w": 1920, "h": 1080}' >Full HD</option>
                                                            <option value='{"w": 3840, "h": 2160}' >4K</option>
                                                            <option value='{"w": 7680, "h": 4320}' >8K</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Button className="homeButton" variant={`btn btn-dark`} onClick={swap}>{chose ? "Vertical" : "Horizontal"}<Rotate90DegreesCcwIcon /></Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button className="homeButton"  onClick={submitChanges} >Submit</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='templatePreview'>
                                            <div style={finalPreview()} />
                                        </div>
                                    </Col>
                                </div>
                            </form>
                        </Row>
                </div>
            </div>
        </div>
    )
}
