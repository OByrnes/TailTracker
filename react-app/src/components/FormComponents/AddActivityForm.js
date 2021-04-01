import React, {useState} from "react"
import "./index.css"
import logo from "../../images/TTLogo1png.png";


const AddanActivity = () => {
    let activityTypes = [{type: "walk", exertion: 1},
        {type: "jog", exertion: 1.5},
        {type: "bike ride", exertion: 2},
        {type: "dog_park", exertion: 1.5},
        {type: "playtime with dog friends", exertion: 2},
        {type: "playtime with human friends", exertion: 1},
        {type: "hike", exertion: 1.3},
        {type: "other", exertion: 1}]
    const [activityType, setActivityType] = useState(activityTypes[0].type)
    const [minutes, setMinutes] = useState(0)
    const [date, setDate] = useState(Date.now())
    const submitYourActivity = () => {

    }
    return (
        <div className="form_page_container">
            <div className="login-page_header__container">
                <img alt="logo" src={logo} />
                <span className="form_TailTracker">Add an activity</span>
            </div>

            <form onSubmit={submitYourActivity}>
                <div>
                    <select value={activityType} onChange={(e)=>setActivityType(e.target.value)}>
                        {activityTypes.map(activity_type => (
                            <option value={activity_type.type} key={activity_type.type}>{activity_type.type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>How long was the activity?</label>
                    <input type="number" name="minutes" value={minutes} onChange={(e)=>setMinutes(e.target.value)}/>
                </div>
                <div>
                    <input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} />
                </div>
                <button className="form__button" type="submit">Add your dog!</button>
            </form>

        </div>
    )

}

export default AddanActivity