import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./index.css"


const UserinfoDD = ({setDDOpen}) =>{
    return (
        <div className="DropDown__container">
            <span className="clickable closeDD" onClick={()=>setDDOpen(false)}>X</span>
            <LogoutButton />
            <NavLink to="/remove-dog">Remove a dog</NavLink>
            <NavLink to="/resources">Resources</NavLink>
        </div>
    )

}
export default UserinfoDD