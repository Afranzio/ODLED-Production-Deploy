import React, {useState, useRef } from 'react'
import Alert from './alert';
import firebase from 'firebase';

export default function ForgotPwd() {
    const auth = firebase.auth();

    const ref = useRef(null);

    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const frgpwd=(event)=>{
        event.preventDefault();
        auth.sendPasswordResetEmail(email)
        .then(function() {
            setMsg("Please check your Mail-ID")
            handleClick();
            console.log("Check Mail")
          })
        .catch((error)=> {
            setMsg(error.message)
            handleClick();
        })
      }

    const handleClick = () => {
        ref.current.handleShow();
    };

    return (
        <div className="wrapper" >
            <div className="outer">
                <div className="middle">
                    <div className="auth-inner">
                    <h3>Forgot Password</h3>
                    <form className="forgot-form">
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=> {setEmail(e.target.value);}} />
                        </div>
                        <div>
                            <p>Request to change password and contact the ODLED support!!</p>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" onClick={frgpwd} style={{width: "80%"}} >Submit</button>
                    </form>
                    <Alert message={msg} ref={ref} />
                    </div>
                </div>
            </div>
        </div>
    )
}
