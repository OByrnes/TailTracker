import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import Modal from "react-modal"
import { useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import MakeReoccuring from "../FormComponents/MakeReoccuring";
import "./index.css"

const ActivityPage = () => {
    
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [comment, setComment] = useState('')
    const [showReoccuring, setShowReoccuring] = useState(false)
    const user = useSelector(state => state.session.user);
    let dogs = user.dogs
    const history = useHistory()
    // function dayofWeekInMonth(m, y, day) {
    //     var firstDayofMonth = new Date( y,m,1 )
    //     let daysOfMonth = []
    //     let earliestDay = day-firstDayofMonth.getDay()+1
    //     if (earliestDay < 0 ){
    //         earliestDay += 7
    //     }
    //     let days = new Date(y, m , 0).getDate()
    //     for (let i= earliestDay; i<days; i+=7){
    //         daysOfMonth.push(new Date(y, m, i))
    //     }
        
    //     return daysOfMonth
    //   }
    //   let dayofWeekList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"]
      
      const {activityid} = useParams()
      
      let allActivities = []
      let activity;
      if(user){
          user.dogs.forEach( dog=> {
              allActivities.push(...dog.activities)
              dog.activities.forEach(act => {
                  if (Number(act.id) === Number(activityid)){
                      
                      activity= act
                  }

              })
          });
        }
        useEffect(()=>{
            setComment(activity.comment)
        },[activity])
        const closeRecurring = () => {
            setShowReoccuring(false)
        }
        
// const handleDay = (e) => {
//     let array =[]
//     let newdays= document.getElementsByClassName("DayCheck")
//         for (let i=0; i< newdays.length; i++){
//             if(newdays[i].checked){
//                 array.push(newdays[i].value)
//         }
//         }
//     setDays(array)
//         }
//         const addAnotherDog = () => {
//             let array =[]
//             let dogs_in_activity= document.getElementsByClassName("dogCheck")
//             for (let i=0; i< dogs_in_activity.length; i++){
//               if(dogs_in_activity[i].checked){
//                 array.push(dogs_in_activity[i].value)
//               }
//             } 
//             setDogsIds(array)
     
//          }
        const addComment = async (e) => {
            e.preventDefault()
            let activityForm = new FormData()
            activityForm.append('comment',comment)
            let res = await fetch(`/api/activities/addcomment/${activity.id}`, {
                method: "POST",
                body: activityForm
            })
            if (res.ok) {
                await res.json()
                history.push(`/activities/${activity.id}`)
            }
            else{
                console.log("error")
            }

        }
        
        const deleteActivity = async () =>{
            let res = await fetch(`/api/activities/delete/${activity.id}`,{ method: 'DELETE' })
            if (res.ok){
                history.push("/")
            }
        }
        const updateImage = (e) => {
            const file = e.target.files[0];
            setImage(file);
        }
        const addActivityPicture = async (e) => {
            e.preventDefault()
            const formData = new FormData();
            formData.append("image", image);
            setImageLoading(true);
        const res = await fetch(`/api/activities/addimage/${activity.id}`, {
            method: "PATCH",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/home");
        }
        else {
            setImageLoading(false);
            console.log("error");
        }
        }
    return (
        <div className="activity_page__container">
            <div className="activities__list">
                <div>
                    <h4>All Activities</h4>
                </div>
                {allActivities.map(act => (
                    <NavLink key={act.id} to={`/activities/${act.id}`}>
                    <div className="activity_list__item" >
                        <span>{act.date.toLocaleString()}</span>
                        <span>{act.activityType.type}</span>
                    </div>
                    </NavLink>
                ))}
            </div>
            <div className="activity-main-content__container">
            <div className="activity_thumbnail">
                        {activity.name? <span>{activity.name}</span>:null}
                        {activity.activity_img? <img src={activity.activity_img} alt="activity"/>:(<form onSubmit={addActivityPicture}><div>
                <input type="file" name="dogImg" accept="image/*" onChange={updateImage}/>
                </div><button disabled={!image} type='submit'>Add Picture</button></form>)}
                        <span>{activity.date.toLocaleString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                        <form onSubmit={addComment}>
                            <textarea placeholder='add a comment..' value={comment} onChange={(e)=>setComment(e.target.value)} />
                            <button>Add Comment</button>
                        </form>
                        <button onClick={deleteActivity}>Delete Activity</button>
                        <div><span>Is this a reoccurring activity? Add it according to your schedule</span></div>
                        <button onClick={()=>setShowReoccuring(true)}>Make this Activity Reoccuring</button>
                    </div>
            <div>
            <Modal
        isOpen={showReoccuring}
        contentLabel="Reoccuring"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={closeRecurring}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" className="clickable" onClick={(e) => setShowReoccuring(false)}>
            X
          </button>
        </div>
        <MakeReoccuring showReoccuring={showReoccuring} setShowReoccuring={setShowReoccuring} user={user} activity={activity}/>
      </Modal>
                
           
            </div>
            </div>

        </div>
    )

}
export default ActivityPage
