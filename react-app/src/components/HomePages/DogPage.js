import React from "react"
import "./index.css"
import {useSelector, useDispatch} from "react-redux"
import {useParams} from "react-router-dom"

const DogPage = () => {
    let {id} = useParams()
    const user = useSelector(state => state.session.user);
    const dog = user.dogs.filter(dog => Number(dog.id) === Number(id))[0]
    return (
        <div className="home_page__container">
            <div className="dog__thumbnail">
                <span>{dog.name}</span>
                <img src={dog.dog_img} alt="dog"/>
                <div className="dog__info">
                    <span>{dog.description}</span>
                    <span>{dog.weight}</span>
                    <span>{dog.age}</span>
                    
                </div>
            </div>

        </div>
    )

}

export default DogPage