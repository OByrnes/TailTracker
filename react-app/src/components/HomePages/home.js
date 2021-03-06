import React from "react"
import { NavLink, useHistory } from 'react-router-dom';
import {useSelector} from "react-redux"
import DogTableRow from "./DogTableRow"
import "./index.css"


const HomePage = () => {
    
    const user = useSelector(state => state.session.user);
    let date = new Date();
    const history = useHistory()
    Date.prototype.subtractDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }
    if (user.dogs.length=== 0){
        history.push("/adddog")
    }
    return (
        <div className="home_page__container">
           
            <div className="dogs__container">
                {user.dogs.map(dog => (
                    <NavLink key={dog.id} to={`/dogs/${dog.id}`}>
                    <div className="dog__thumbnail" >
                        <div>
                        <span className="dog_Name">{dog.name}</span>
                        <img src={dog.dog_img} alt="dog"/>
                        </div>
                        <div>
                            <span>{dog.description}</span>
                        </div>
                            
                    </div>
                    </NavLink>
                ))}

            </div>

            <div className="Activities">
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
                       {user.dogs.map(dog =>(
                           <DogTableRow key={dog.id} dog={dog} />

                       ))}
                       </tbody>

                    </table>

            </div>


        </div>
    )

}

export default HomePage