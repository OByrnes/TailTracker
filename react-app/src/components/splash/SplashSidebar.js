import React from "react"
import { NavLink } from "react-router-dom"
import "./index.css"

const SplashSidebar = ({setShowSidebar, setLogin, setSignup})=>{
    
    return (
        <div className="splashSidebar__container">
                <div className="close_sidebar clickable" onClick={()=>setShowSidebar(false)}>X</div>
                <ul>
                    <li><NavLink to="/features">FEATURES</NavLink></li>
                    <li className="clickable" onClick={()=>setLogin(true)}> LOG IN</li>
                    <li className="clickable" onClick={()=>setSignup(true)}>SIGN UP</li>
                    <li> <NavLink to="/resources">Resources</NavLink></li>
                </ul>

        </div>
    )
}
export default SplashSidebar