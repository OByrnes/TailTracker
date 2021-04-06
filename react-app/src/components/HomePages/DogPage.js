import React, { useState, useEffect } from "react"
import Modal from "react-modal";
import "./index.css"
import {useSelector, useDispatch} from "react-redux"
import {NavLink, useParams} from "react-router-dom"
import { getAllBreeds } from "../../store/breeds"
import { getAllActivityTypes } from "../../store/activityTypes"
import EditDog from "../FormComponents/EditDog"
import DogTableRow from "./DogTableRow"
import SetGoal from "../FormComponents/SetGoal";

const DogPage = () => {
    let {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBreeds())
    },[])
    const user = useSelector(state => state.session.user);
    const dog = user.dogs.filter(dog => Number(dog.id) === Number(id))[0]
    let activities = dog.activities.map( activity => {
        let activityDate = new Date(activity.date)
        activity.date = activityDate
        return activity
    })
    let currentDay = new Date()
    let sortedactivities = activities.sort((a,b)=> {
        return b.date-a.date})
    
    Date.prototype.subtractDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    
    let date = new Date();
    let sixdaysago=date.subtractDays(6)
    let fivedaysago = date.subtractDays(5)
    let fourdaysago =date.subtractDays(4)
    let threedaysago = date.subtractDays(3)
    let twodaysago = date.subtractDays(2)
    let yesterday = date.subtractDays(1)

   
    let activitiestoday= activities.filter( activity => activity.date.toLocaleDateString() == date.toLocaleDateString())
    let activitiessixdaysago= activities.filter( activity => activity.date.toLocaleDateString() == date.subtractDays(6).toLocaleDateString())
    let activitiesfivedaysago = activities.filter( activity => activity.date.toLocaleDateString() == date.subtractDays(5).toLocaleDateString())
    let activitiesfourdaysago =activities.filter( activity => activity.date.toLocaleDateString() == date.subtractDays(4).toLocaleDateString())
    let activitiesthreedaysago = activities.filter( activity => activity.date.toLocaleDateString() == date.subtractDays(3).toLocaleDateString())
    let activitiestwodaysago = activities.filter( activity => activity.date.toLocaleDateString() == date.subtractDays(2).toLocaleDateString())
    let activitiesyesterday = activities.filter( activity => activity.date.toLocaleDateString() == date.subtractDays(1).toLocaleDateString())
    console.log(activitiestwodaysago)
    
    const [newDailyGoal, setNewDailyGoal] = useState(10)
    const [updatingGoal, setUpdatingGoal] = useState(false)
    const [editDog, setEditDog] = useState(false)
    const [showActivityGoal, setShowActivityGoal] = useState(false)
    let goalMessage;
    if(newDailyGoal > 25){
        goalMessage ="SUPER active dog!!"
    }else if(newDailyGoal > 20){
        goalMessage = "Very active Dog!!"
    }else if(newDailyGoal > 15){
        goalMessage = "Pretty active Dog!"
    } else if( newDailyGoal > 10){
        goalMessage = "active Dog"
    } else if (newDailyGoal > 5){
        goalMessage = "moderately active dog"
    } else{
        goalMessage = "Couch Potato"
    }
    let goalPuppyMessage;
    if(newDailyGoal > 25){
        goalPuppyMessage ="SUPER active puppy!!"
    }else if(newDailyGoal > 20){
        goalMessage = "Very active Puppy!!"
    }else if(newDailyGoal > 15){
        goalPuppyMessage = "Pretty active Puppy!"
    } else if( newDailyGoal > 10){
        goalPuppyMessage = "active Puppy"
    } else if (newDailyGoal > 5){
        goalPuppyMessage = "moderately active puppy"
    } else{
        goalPuppyMessage = "Couch Potato Puppy"
    }
    let currentDateYear = new Date().getFullYear()
        let currentDateMonth = new Date().getMonth()
        let dogBirthyear = new Date(dog.birthday).getFullYear()
        let dogBirthMonth = new Date(dog.birthday).getMonth()
        let ageinYears = currentDateYear-dogBirthyear
        let ageinMonths = currentDateMonth-dogBirthMonth
        console.log(ageinMonths)
        if (ageinYears <= 1){
            if (ageinMonths<0){
                dog.age=(`${12+ageinMonths} months`)
                
            }
            else{
                dog.age=(`${ageinMonths} months`)
                
            }

        }else{
            dog.age=(`${ageinYears} years`)
            
        }
        
        const closeEditDog = () => {
            setEditDog(false)
        }
        const closeSetActivityGoal = () => {
            setShowActivityGoal(false)
        }

    const setNewGoal = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("daily_goal", newDailyGoal)
        setUpdatingGoal(true)
        const res = await fetch(`/api/dogs/${dog.id}`, {
            method: "PATCH",
            body: formData
        
        });
        if (res.ok){
            await res.json()
            setUpdatingGoal(false)
        }

        

    }
    Modal.setAppElement("#root");

    return (
        <div className="home_page__container">
            <Modal
        isOpen={editDog}
        contentLabel="EditDog"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={closeEditDog}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" className="clickable" onClick={(e) => setEditDog(false)}>
            X
          </button>
        </div>
        <EditDog dog={dog}/>
      </Modal>
            <div className="dog__thumbnail dog_page">
                <span className="dog_Name">{dog.name}</span>
                <img src={dog.dog_img} alt="dog"/>
                <div className="dog__info">
                    <span>{dog.description}</span>
                    <span>{dog.weight} pounds</span>
                    <NavLink to={`/breeds/${dog.breed?.id}`}><span>{dog.breed?.name}</span></NavLink>
                    {dog.puppy?<span>{dog.age}</span>:<span>{dog.age}</span>}
                    <button onClick={()=>setEditDog(true)}>Edit Dog Info</button>
                </div>
                    
                </div>
                   
                    
                <div className="daily-goal__container">
                    <div className="Daily points Description">
                        <p>Points are based on the exertion and length of the activity. A dog that needs a 45 minute walk would be exhausted after a 45 minute bike ride</p>
                        <p>Recommendations are based on the average needs of the breed. You can Change the daily goal if it does not match with your dog's activity needs</p>
                    </div>
                    {dog.puppy?<div><h1>PUPPY exercise</h1><p>A good rule of thumb is a ratio of five minutes exercise per month of age (up to twice a day) until the puppy is fully grown e.g. 15 minutes (up to twice a day) when 3 months old, 20 minutes when 4 months old and so on. Once they are fully grown, they can go out for much longer.</p></div>:null}
                    {dog.daily_goal?<span>{`${dog.name}'s daily goal: `}{dog.daily_goal}</span> :null}
                    <button onClick={()=>setShowActivityGoal(true)}>Set New Goal</button>
                    <Modal
        isOpen={showActivityGoal}
        contentLabel="EditDog"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={closeSetActivityGoal}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" className="clickable" onClick={(e) => setShowActivityGoal(false)}>
            X
          </button>
        </div>
        <SetGoal setNewGoal={setNewGoal} newDailyGoal={newDailyGoal} goalMessage={goalMessage} goalPuppyMessage={goalPuppyMessage} updatingGoal={updatingGoal} setNewDailyGoal={setNewDailyGoal} closeSetActivityGoal={closeSetActivityGoal} dog={dog}/>
      </Modal>
                    {/* {!dog.puppy?<div className="form_container">
                        <form onSubmit={setNewGoal}>
                        <div className="slidecontainer">
                                <input type="range" min="1" max="30" value={newDailyGoal} className="slider" id="myRange" onChange={(e)=>setNewDailyGoal(e.target.value)}/>
                                <span>{newDailyGoal}</span><span>{goalMessage}</span>
                                <span>Recommendation based on Breed{dog.breed?.avg_activity_level}</span>
                        </div>
                        <button type="submit">set new goal</button>

                        </form>

                    </div>:<div className="form_container">
                        <form onSubmit={setNewGoal}>
                        <div className="slidecontainer">
                                <span>Puppy goal</span>
                                <input type="range" min="1" max="30" value={newDailyGoal} className="slider" id="myRange" onChange={(e)=>setNewDailyGoal(e.target.value)}/>
                                <span>{newDailyGoal}</span><span>{goalPuppyMessage}</span>
                                <span>Recommendation based on Age{Math.floor(Number(dog.age.split(' ')[0])*10/6)}</span>
                        </div>
                        {updatingGoal?<div>Updating Goal....</div>:<button type="submit">set new goal</button>}

                        </form>

                    </div>} */}
            </div>
            
               <table className="activity-table">
                   <thead>
                   <tr>
                       <th>Dog</th>
                       <th>{date.subtractDays(6).toLocaleDateString()}</th>
                       <th>{date.subtractDays(5).toLocaleDateString()}</th>
                       <th>{date.subtractDays(4).toLocaleDateString()}</th>
                       <th>{date.subtractDays(3).toLocaleDateString()}</th>
                       <th>{date.subtractDays(2).toLocaleDateString()}</th>
                       <th>{date.subtractDays(1).toLocaleDateString()}</th>
                       <th>{date.toLocaleDateString()}</th>
                   </tr>
                   </thead>
                   <tbody>
                       <DogTableRow dog={dog} />
                       {/* <tr>
                           <td>
                            {activitiessixdaysago.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                ))}
                           </td>
                           <td>
                            {activitiesfivedaysago.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                ))}
                           </td>
                           <td>
                            {activitiesfourdaysago.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                ))}
                           </td>
                           <td>
                            {activitiesthreedaysago.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                ))}
                           </td>
                           <td>
                            {activitiestwodaysago.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                ))}
                           </td>
                           <td>
                            {activitiesyesterday.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                ))}
                           </td>
                           <td>
                            {activitiestoday.length ? activitiestoday.map(activity => (
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date?.toLocaleString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType?.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType?.exertion/6)}</span>
                    </div>
                )):null}
                           </td>
                           
                       </tr>
                       <tr>
                           <td>
                               {activitiessixdaysago.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                           <td>
                               {activitiesfivedaysago.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                           <td>
                               {activitiesfourdaysago.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                           <td>
                               {activitiesthreedaysago.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                           <td>
                               {activitiestwodaysago.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                           <td>
                               {activitiesyesterday.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                           <td>
                               {activitiestoday.reduce((a,b) => a+ (b.minutes*b.activityType.exertion/6 || 0), 0)} Points
                           </td>
                       </tr> */}
                   </tbody>

               </table>
        </div>
    )

}

export default DogPage