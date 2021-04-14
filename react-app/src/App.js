import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import * as sessionActions from "./store/session"
import Splash from "./components/splash/SplashPage"
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./components/HomePages/home";
import DogPage from "./components/HomePages/DogPage";
import AddaDog from "./components/FormComponents/AddDogForm";
import AddRouteForm from "./components/FormComponents/AddRouteForm"
import RoutePage from "./components/HomePages/RoutePage"
import RemoveDogComponent from "./components/FormComponents/RemoveDog"
import AddanActivity from "./components/FormComponents/AddActivityForm";
import BreedsPage from "./components/breeds/BreedsPage";
import BreedPage from "./components/breeds/BreedPage";
import ActivityPage from "./components/ActivityPage/Activity";
import Resource from "./components/ResourcesPage/Resource";
import FeaturesPage from "./components/FeaturesPage/FeaturesPage";

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
        <Route path="/resources">
          <Resource />
        </Route>
        <Route path="/features">
          <FeaturesPage />
        </Route>
        
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
        <ProtectedRoute path="/breeds" exact={true}>
          <BreedsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/breeds/:breedid" exact={true}>
          <BreedPage />
        </ProtectedRoute>
        <ProtectedRoute path="/activities/:activityid" exact={true}>
          <ActivityPage />
        </ProtectedRoute>
        <ProtectedRoute path="/remove-dog" exact={true}>
          <RemoveDogComponent />
        </ProtectedRoute>
        <ProtectedRoute path="/routes" exact={true}>
          <AddRouteForm />
        </ProtectedRoute>
        <ProtectedRoute path="/routes/:routeid" exact={true}>
          <RoutePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
