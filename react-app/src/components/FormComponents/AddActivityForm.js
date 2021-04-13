import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import logo from "../../images/TTLogo1png.png";
import { getAllActivityTypes } from "../../store/activityTypes";
import { getAllRoutes } from "../../store/routes";


const AddanActivity = () => {
    
    const user = useSelector(state => state.session.user);
    let dogs = user.dogs
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllActivityTypes())
        dispatch(getAllRoutes())
    },[])

    let activityTypes = useSelector(state => state.activityTypes?.activityTypes?.activityTypes)
    let routes = useSelector(state => state.routes.Routes?.routes)
    console.log(routes)
    let currentDate = new Date();
    let month;
    let dayDate;
    if (currentDate.getDate() > 9){
        dayDate = currentDate.getDate()
    }else{
        dayDate = `0${currentDate.getDate()}`
    }
    if (currentDate.getMonth() > 9){
        month = currentDate.getMonth()
    }else{
        month = `0${currentDate.getMonth()}`
    }
    let curr = `${currentDate.getFullYear()}-${month}-${dayDate}T${currentDate.getHours()}:${currentDate.getMinutes()}`


    const [activityType, setActivityType] = useState(1)
    const [name, setName] = useState('')
    const [minutes, setMinutes] = useState('')
    const [date, setDate] = useState(curr)
    const [dogsIds, setDogsIds] = useState([])
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [routeId, setRouteId] = useState(0)
    const history = useHistory()
    let routeList;
    if (routes){
        routeList= routes
    }
    
    const submitYourActivity = (e) => {
        e.preventDefault()
        
        dogsIds.forEach( async dog_id =>{
            let dateString = new Date(date).toLocaleString()
            
            let newActivity = new FormData()
            newActivity.append('image',image )
            newActivity.append('name', name)
             newActivity.append("dog_id",dog_id)
             newActivity.append("activityType_id",activityType)
             newActivity.append("minutes",minutes)
             newActivity.append("date", dateString)
             if (routeId !== 0){
                 newActivity.append("route_id", routeId)

             }
             setImageLoading(true)
            let res = await fetch("/api/activities/", {
                method: "POST",
                body: newActivity
            })
            if (res.ok) {
                await res.json()
                history.push("/home")
                setImageLoading(false)
            }
            else{
                console.log("error")
            }
        })
        
    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    const addAnotherDog = () => {
       let array =[]
       let dogs_in_activity= document.getElementsByClassName("dogCheck")
       for (let i=0; i< dogs_in_activity.length; i++){
         if(dogs_in_activity[i].checked){
           array.push(dogs_in_activity[i].value)
         }
       } 
       setDogsIds(array)

    }
    return (
        <div className="outerPage__container">
        <div className="form_page_container">
            
            <div className="login-page_header__container">
                <img alt="logo" src={logo} />
                <span className="form_TailTracker">Add an activity</span>
            </div>

            <form onSubmit={submitYourActivity}>
                
                    <div>
                        <label>Who went on the Activity?</label>
                    <fieldset onChange={addAnotherDog}>
            {dogs.map((dog) => (<label className="container" key={dog.id}>{dog.name}<input className="dogCheck" type="checkbox" name="dogCheckbox" value={dog.id} key={dog.id}/><span class="checkmark"></span> </label>))}
          </fieldset>
                    </div>
                    <div>
                    <label>What kind of exercise was it?</label>
                    <div className="custom-select">
                    <select value={activityType} onChange={(e)=>setActivityType(e.target.value)}>
                        <option></option>
                        {activityTypes? activityTypes.map(activity_type => (
                            <option value={activity_type.id} key={activity_type.id}>{activity_type.type}</option>
                        )):null}
                    </select></div>
                    </div>
                
                <div>
                    <label>Add a Picture from your Activity!</label>
                <input type="file" name="activityImg" accept="image/*" onChange={updateImage}/>
                </div>
                <div>
                    <label>Route you took?</label>
                    <div className="custom-select">
                    <select value={routeId} onChange={(e)=>setRouteId(e.target.value)}>
                        <option></option>
                        {routeList? routeList.map(existingroute => (
                            <option key={routeId} value={existingroute.id}>{existingroute.name}</option>
                        )):null }
                    </select>
                    </div>
                    </div>
                <div>
                    <label>How long was the activity?</label>
                    <input type="number" name="minutes" value={minutes} onChange={(e)=>setMinutes(e.target.value)}/>
                </div>
                <div>
                    <label>Give the activity a name</label>
                    <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Date of the Activity</label>
                    <input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} />
                </div>
                <button className="form__button" type="submit">Add activity</button>
            </form>

        </div>
        </div>
    )

}

export default AddanActivity