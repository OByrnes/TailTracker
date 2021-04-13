import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import Modal from "react-modal"
import { useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import MakeReoccuring from "../FormComponents/MakeReoccuring";
import "./index.css"
import { getAllRoutes } from "../../store/routes";

const ActivityPage = () => {
    
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [comment, setComment] = useState('')
    const [showReoccuring, setShowReoccuring] = useState(false)
    const user = useSelector(state => state.session.user);
    let routes = useSelector(state => state.routes?.Routes?.routes)
   
    
    const history = useHistory()
    
      
      const {activityid} = useParams()
      const dispatch = useDispatch()
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
        let route;
        useEffect( ()=>{
            dispatch(getAllRoutes()) 
        },[])
        if (routes && activity.route){
            
            route = routes.filter(R => R.id == activity.route )[0]
        
        }
        useEffect(()=>{
            setComment(activity.comment)
        },[activity])
        const closeRecurring = () => {
            setShowReoccuring(false)
        }
        
        
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
        const res = await fetch(`/api/activities/addimage/${activity.id}/`, {
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
                <div className="heading__container">
                    <h4>All Activities</h4>
                </div>
                {allActivities.map(act => (
                    <NavLink key={act.id} to={`/activities/${act.id}`}>
                    <div className="activity_list__item" >
                        <span className="activity-name">{act.name}</span>
                        <span>{new Date(act.date).toLocaleString()}</span>
                    </div>
                    </NavLink>
                ))}
            </div>
            <div className="activity-main-content__container">
                <div className="header__container">
                    {activity.name? <span>{activity.name}</span>:null}
                </div >
                <div className="top-content">
                <div className="activity-info">
                        {activity.activity_img? <div className="img_container"><img src={activity.activity_img} alt="activity"/></div>:(<div className="img_container form__container"><form onSubmit={addActivityPicture}><div>
                <input type="file" name="dogImg" accept="image/*" onChange={updateImage}/>
                </div><button disabled={!image} type='submit'>Add Picture</button></form></div>)}
                {imageLoading?<span>Image Loading...</span>:null}
                </div>
                    <div className="activity-info__container">

                        <span>{new Date(activity.date).toLocaleString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        {route? <div>
                            <span>{route.name}  </span>
                            <span>{route.distance.toFixed(2)} Miles</span>
                            </div>:null}
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                        {activity.comment?<span>{activity.comment}</span>:<div className="form__container">
                        <form onSubmit={addComment}>
                            <textarea placeholder='add a comment..' value={comment} onChange={(e)=>setComment(e.target.value)} />
                            <button>Add Comment</button>
                        </form></div>}
                    </div>

                </div>
                <div className="button-container">
                    <button id="delete-btn" onClick={deleteActivity}>Delete Activity</button>
                    <button className="clickable reocuring" onClick={()=>setShowReoccuring(true)}>Make this Activity Reoccuring</button>

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
          <button className="closeIco clickable"  onClick={(e) => setShowReoccuring(false)}>
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
