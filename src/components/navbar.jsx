import React from 'react'
import { Link } from "react-router-dom";

// Cloud
import { auth } from '../secure/firebase';

export default function Navbar() {
    const user = true
    return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        <Link className="navbar-brand" to={"/"} ><img src="./Logo/od.png" alt=""/></Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                {(user==null)?<Link to="/sign-in"> <input type="button" value="Login" /> </Link> : <input type="button" value="Logout" onClick={() => auth.signOut()} /> }
            </li>
            </ul>
        </div>
        </div>
    </nav>
    )
}
