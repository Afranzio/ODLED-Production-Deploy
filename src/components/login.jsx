import React, {useState, useRef } from "react";
import Alert from './alert';
import { auth } from '../secure/firebase'
import { useHistory} from "react-router-dom";

export default function Login({setuser, reloader}){

    let history = useHistory();

    const ref = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const signIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(() => {
            setuser(auth.currentUser.email)
            window.location = "#/home";
            // reloader();
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
        <div className="outer">
            <div className="middle">
                <div className="auth-inner">
                    <h3 style={{fontFamily: "'Quicksand', sans-serif"}}>Welcome Admin</h3>
                    <form>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=> {setEmail(e.target.value);}} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=> {setPassword(e.target.value);}} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={signIn} style={{width: "80%"}} >Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#/forgotpwd">password?</a>
                        </p>
                    </form> 
                    <Alert className="alert" message={msg} ref={ref} />
                </div>
            </div>
        </div>
    );
}