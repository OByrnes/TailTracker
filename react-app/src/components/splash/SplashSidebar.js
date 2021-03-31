import React from "react"
import { NavLink } from "react-router-dom"
import "./index.css"

const SplashSidebar = ({setShowSidebar, setLogin, setSignup})=>{
    
    return (
        <div className="splashSidebar__container">
                <div className="close_sidebar" onClick={()=>console.log(false)}>X</div>
                <ul>
                    <li><NavLink to="/features">FEATURES</NavLink></li>
                    <li onClick={setLogin(true)}> LOG IN</li>
                    <li onClick={setSignup(true)}>SIGN UP</li>
                    <li> <NavLink to="/sources">Resources</NavLink></li>
                </ul>

        </div>
    )
}
export default SplashSidebar