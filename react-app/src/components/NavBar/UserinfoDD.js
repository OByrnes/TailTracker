import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./index.css"


const UserinfoDD = ({setDDOpen}) =>{
    return (
        <div className="DropDown__container">
            <div className="clickable closeDD" onClick={()=>setDDOpen(false)} >
            <span >X</span>
            </div>
            <div>
            <LogoutButton />
            </div>
            <div>
            <NavLink to="/remove-dog">Remove a dog</NavLink>
            </div>
            <div>
            <NavLink to="/resources">Resources</NavLink>
            </div>
        </div>
    )

}
export default UserinfoDD