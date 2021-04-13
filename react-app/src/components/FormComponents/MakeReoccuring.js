import React, { useState } from "react";
import {useSelector} from "react-redux"
import {useParams } from "react-router";

const MakeReoccuring = ({showReoccuring, setShowReoccuring} ) => {
    const [days, setDays] = useState([])
    const [dogsIds, setDogsIds] = useState([])
    const user = useSelector(state => state.session.user);

    let dogs = user.dogs
    function dayofWeekInMonth(m, y, day) {
        var firstDayofMonth = new Date( y,m,1 )
        let daysOfMonth = []
        let earliestDay = day-firstDayofMonth.getDay()+1
        if (earliestDay < 0 ){
            earliestDay += 7
        }
        let days = new Date(y, m , 0).getDate()
        for (let i= earliestDay; i<days; i+=7){
            daysOfMonth.push(new Date(y, m, i))
        }
        
        return daysOfMonth
      }
      const handleDay = (e) => {
        let array =[]
        let newdays= document.getElementsByClassName("DayCheck")
            for (let i=0; i< newdays.length; i++){
                if(newdays[i].checked){
                    array.push(newdays[i].value)
            }
            }
        setDays(array)
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
      let dayofWeekList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"]
      
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
        const handleAddSchedule = (e) =>{
            e.preventDefault()
            let currentMonth = new Date().getMonth()
            let currentYear = new Date().getFullYear()
            let allDays = []
            days.forEach(day=>{
                allDays.push(...dayofWeekInMonth(currentMonth, currentYear, dayofWeekList.indexOf(day)))
            })
            dogsIds.forEach( async dog_id =>{
                allDays.forEach( async date =>{
                    let dateString = new Date(date).toLocaleString()
                    let newActivity = new FormData()
                    newActivity.append('name', activity.name)
                     newActivity.append("dog_id",dog_id)
                     newActivity.append("routeId", activity.route_id)
                     newActivity.append("activityType_id",activity.activityType.id)
                     newActivity.append("minutes",activity.minutes)
                     newActivity.append("date", dateString)
                     
                    let res = await fetch("/api/activities/", {
                        method: "POST",
                        body: newActivity
                    })
                    if (res.ok) {
                        await res.json()
                        setShowReoccuring(false)
                    }
                    else{
                        console.log("error")
                    }

                })
            })
        }
    return (
        <div className="form_container">
                <form onSubmit={handleAddSchedule}>
                
                <fieldset onChange={addAnotherDog}>
            {dogs?dogs.map((dog) => (<label key={dog.id}>{dog.name}<input className="dogCheck" type="checkbox" name="dogCheckbox" value={dog.id} key={dog.id}/> </label>)):null}
          </fieldset>
                    <fieldset onChange={handleDay}>
                    <label>
                        Sunday

                    <input type="checkbox" value="Sunday" className="DayCheck" />
                    </label>
                    <label>
                        Monday
                    <input type="checkbox" value="Monday" className="DayCheck" />

                    </label>
                    <label>
                        Tuesday
                    <input type="checkbox" value="Tuesday"className="DayCheck" />

                    </label>
                    <label>
                        Wednesday
                    <input type="checkbox" value="Wednesday" className="DayCheck" />

                    </label>
                    <label>
                        Thursday
                    <input type="checkbox" value="Thursday" className="DayCheck" />

                    </label>
                    <label>
                        Friday
                    <input type="checkbox" value="Friday" className="DayCheck" />

                    </label>
                    <label>
                        Saturday
                    <input type="checkbox" value="Saturday" className="DayCheck"/>

                    </label>
                    </fieldset>
                    <button type="submit">Add Schedule</button>

                </form>

                </div>

    )
}

export default MakeReoccuring