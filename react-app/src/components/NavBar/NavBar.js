import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../images/TTLogo1png.png"
import addActivityIcon from "../../images/addActivityTT.png"
import addDogIcon from "../../images/adddogTT.png"
import homeIcon from "../../images/homeTT.png"
import breedsIcon from "../../images/breedTT.png"
import dogRoute from "../../images/dogroute.png"
import { useModal } from '../../context/modalContext'
import "./index.css"
import UserinfoDD from './UserinfoDD';

const NavBar = ({ setAuthenticated }) => {
  
  const [DDOpen, setDDOpen] = useState(false)
  
  return (
    <nav>
      {DDOpen?<UserinfoDD setDDOpen={setDDOpen} />:null}
      <div className="nav-logo__container top-home">
      <NavLink to="/home" exact={true} activeClassName="active">
      <div className="navIcon__holder" >
        <img src={Logo} alt="logo"/>
        <span>Home</span>
      </div>
      </NavLink>
      </div>
      <div className="navIcon__holder clickable" onClick={()=>setDDOpen(true)}>
        <img src={homeIcon} alt="userInfo"/>
        <span>User Info</span>
      </div>
      <NavLink to="/adddog">
      <div className="navIcon__holder" >
        <img src={addDogIcon} alt="add-Dog"/>
        <span>Add a dog</span>
      </div>
      </NavLink>
      <NavLink to="/addactivity">
        <div className="navIcon__holder">
          <img src={addActivityIcon} alt="addActivity"/>
          <span>Add Activity</span>
        </div>
      </NavLink>
      <NavLink to="/breeds">
        <div className="navIcon__holder">
          <img src={breedsIcon} alt="breedIcon"/>
          <span>Breeds</span>
        </div>
      </NavLink>
      <NavLink to="/routes">
        <div className="navIcon__holder  last">
          <img src={dogRoute} alt="routeIcon"/>
          <span>Add Route</span>
        </div>
      </NavLink>
    

      
    </nav>
  );
}

export default NavBar;