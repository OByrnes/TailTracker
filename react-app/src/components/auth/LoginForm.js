import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import * as sessionActions from '../../store/session'

import "./index.css";
import logo from "../../images/TTLogo1png.png";

const LoginForm = ({
  authenticated,
  setAuthenticated,
  setSignup,
  setLogin,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);

  
  
  const onLogin = async (e) => {
    e.preventDefault()
    let userAuthen = await dispatch(sessionActions.login(email,password))
    setErrors(userAuthen)

  };
  
  const signupButton = () => {
    setLogin(false);
    setSignup(true);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const errorCheck = {} 
  if (errors){
    errors.forEach(error => { 
    error = error.split(':') 
    errorCheck[error[0].trim()] = error[1]
  })

  }
  if (user){
    return <Redirect to="/home"/>
  }

  return (
    <div className="form_container">
      <div className="login-page_header__container">
        <img alt="logo" src={logo} />
        <span className="login_whatever">TailTracker</span>
        <span>Track the dog walks</span>
      </div>

      <form className="login_form" onSubmit={onLogin}>

        <div>
          <input
            name="email"
            type="text"
            placeholder="Email address"
            value={email}
            onChange={updateEmail}
          />
        {"email" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.email}</p></div> : null}
        </div>
        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          {"password" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.password}</p></div> : null}
        </div>

        <button className="form__button" type="submit">
          Continue
        </button>
      </form>
      <div className="login_footer__container">
        <div className="Remember_me__holder">
          <input type="checkbox" />
          <label> Remember me for 30 days</label>
        </div>
        <div className="donthaveaccount__holder">
          <span>Don't have an account?</span>
          <button className="Login__button" onClick={signupButton}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
