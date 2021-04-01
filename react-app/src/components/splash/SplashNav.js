import React from "react"
import Logo from "../../images/TTLogo1png.png"
import "./index.css"
import hamburgerBtn from "../../images/hamburgerIcon.png"
const SplashNav = ({setShowSidebar}) => {
    
    
    
    return (
        <nav id="splash-nav">
            <div className="splashNavLogo-Name__container">
                 <img alt="logo" src={Logo} />
                <h1>TailTracker</h1>
            </div>
            <div className="hamburgerBtn clickable" onClick={()=>setShowSidebar(true)}>
                <img src={hamburgerBtn} alt="hamburgerIcon" />
            </div>
            
        
        </nav>
    )
}
export default SplashNav