import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import * as sessionActions from "./store/session"
import Splash from "./components/splash/SplashPage"
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import HomePage from "./components/HomePages/home";
import DogPage from "./components/HomePages/DogPage";
import { getAllBreeds } from "./store/breeds";
import AddaDog from "./components/FormComponents/AddDogForm";
import AddanActivity from "./components/FormComponents/AddActivityForm";

function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  
  
  useEffect(()=>{

    dispatch(sessionActions.restoreUser())
    .then(()=> setLoaded(true))
    
  },[dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user? <NavBar setAuthenticated={setAuthenticated} /> :null}
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true} authenticated={authenticated}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/dogs/:id" exact={true} authenticated={authenticated}>
          <DogPage />
        </ProtectedRoute>
        <ProtectedRoute path="/addDog" exact={true} authenticated={authenticated}>
          <AddaDog />
        </ProtectedRoute>
        <ProtectedRoute path="/addActivity" exact={true} authenticated={authenticated}>
         <AddanActivity />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
