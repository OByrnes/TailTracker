import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Logo from "../../images/TTLogo1png.png"
import addActivityIcon from "../../images/addActivityTT.png"
import addDogIcon from "../../images/adddogTT.png"
import homeIcon from "../../images/homeTT.png"
import breedsIcon from "../../images/breedTT.png"
import "./index.css"

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav>
      <div className="nav-logo__container top-home">
      <NavLink to="/home" exact={true} activeClassName="active">
            <img src={Logo} alt="logo"/>
      </NavLink>
      </div>
      {/* <LogoutButton /> */}
      <div className="navIcon__holder">
        <img src={homeIcon} alt="userInfo"/>
        <span>User Info</span>
      </div>
      <div className="navIcon__holder">
        <img src={addDogIcon} alt="add-Dog"/>
        <span>Add a dog</span>
      </div>
      <div className="navIcon__holder">
        <img src={addActivityIcon} alt="addActivity"/>
        <span>Add Activity</span>
      </div>
  
      <div className="navIcon__holder">
        <img src={breedsIcon} alt="breedIcon"/>
        <span>Breeds</span>
      </div>
    

      
    </nav>
  );
}

export default NavBar;