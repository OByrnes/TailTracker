import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import logo from "../../images/TTLogo1png.png";

const RemoveDogComponent = () => {
    const [dogsIds, setDogsIds] = useState([])
    const user = useSelector(state => state.session.user);
    let dogs = user.dogs
    const history = useHistory()
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
    const RemoveDogs = (e)=> {
        e.preventDefault()
        dogsIds.forEach( async dog => {
            let res = await fetch(`api/dogs/delete/${dog}`,{ method: 'DELETE' })
            if (res.ok){
                history.push("/")
            }
        })

    }
return (
    <div className="form_container">
        <form onSubmit={RemoveDogs}>
        <div>
            <fieldset onChange={addAnotherDog}>
            {dogs.map((dog) => (<label key={dog.id}>{dog.name}<input className="dogCheck" type="checkbox" name="dogCheckbox" value={dog.id} key={dog.id}/> </label>))}
          </fieldset>
            </div>
            <button type="submit">Remove Dog</button>
        </form>
    </div>
)
}

export default RemoveDogComponent