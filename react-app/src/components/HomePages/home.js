import React from "react"
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import "./index.css"


const HomePage = () => {
    const breeds = useSelector(state => state?.breeds?.breeds?.breeds[0])
    const user = useSelector(state => state.session.user);

    return (
        <div className="home_page__container">
            <div className="dogs__container">
                {user.dogs.map(dog => (
                    <NavLink to={`/dogs/${dog.id}`}>
                    <div className="dog__thumbnail" key={dog.id}>
                        <span>{dog.name}</span>
                        <img src={dog.dog_img} alt="dog"/>
                    </div>
                    </NavLink>
                ))}

            </div>

        </div>
    )

}

export default HomePage