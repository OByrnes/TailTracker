import React from "react"
import { NavLink } from "react-router-dom"
import "./index.css"


const DogTableRow = ({dog}) => {


    let activities = dog.activities.map( activity => {
        let activityDate = new Date(activity.date)
        activity.date = activityDate
        return activity
    })
    let currentDay = new Date()
    
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
    return (
        <>
        <tr>
            <td>
                {dog.name}
            </td>
                           <td>
                            {activitiessixdaysago.map(activity => (
                    <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div></NavLink>
                ))}
                           </td>
                           <td>
                            {activitiesfivedaysago.map(activity => (
                    <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                </NavLink>
                ))}
                           </td>
                           <td>
                            {activitiesfourdaysago.map(activity => (
                            <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date?.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div>
                    </NavLink>
                ))}
                           </td>
                           <td>
                            {activitiesthreedaysago.map(activity => (
                    <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date?.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div></NavLink>
                ))}
                           </td>
                           <td>
                            {activitiestwodaysago.map(activity => (
                                <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div></NavLink>
                ))}
                           </td>
                           <td>
                            {activitiesyesterday.map(activity => (
                    <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date?.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType.exertion/6)}</span>
                    </div></NavLink>
                ))}
                           </td>
                           <td>
                            {activitiestoday.length ? activitiestoday.map(activity => (
                    <NavLink to={`/activities/${activity.id}`}>
                    <div key={activity.id} className="activity_thumbnail">
                        <span>{activity.date?.toLocaleTimeString()}</span>
                        <span>{activity.minutes} Minutes</span>
                        <span>{activity.activityType?.type}</span>
                        <span>Points {Math.floor(activity.minutes*activity.activityType?.exertion/6)}</span>
                    </div></NavLink>
                )):null}
                           </td>
                           
                       </tr>
                       <tr>
                           <td></td>
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
                       </tr>
        </>
    )
}

export default DogTableRow