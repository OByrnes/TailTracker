import React, { useState, useEffect } from "react"
import "./index.css"
import BreedSuggester from "../autosuggest"
import {useSelector, useDispatch} from "react-redux"
import {NavLink, useParams, useHistory} from "react-router-dom"
import { getAllBreeds } from "../../store/breeds"

const BreedsPage = () => {
    let {breedid} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBreeds())
    },[])
    const user = useSelector(state => state.session.user);
    let breeds = useSelector(state=> state.breeds?.breeds?.breeds)
    let breed;
    if (breeds){
        breed = breeds.filter(breed => breed.id === Number(breedid))[0]
    }
    console.log(breed)
    return (
        
    <div className="breed-Page__container">
        <div>
            <span className="breed_name">{breed?.name}</span>
            <img src={breed?.breed_img_url} alt="breed"/>

        </div>
        <div className="breed_info">
            {breed?.temperament? <span><b>Temperament: </b>{breed.temperament}</span>:null}
            {breed?.bred_for? <span><b>Bred For: </b>{breed.bred_for}</span>:null}
            {breed?.avg_activity_level? <span><b>Average activity Level: </b>{breed.avg_activity_level} points about {breed.avg_activity_level*6} minutes per day</span>:null}
            {breed?.height? <span><b>Height: </b>{breed.height}</span>:null}
            {breed?.weight? <span><b>Weight: </b>{breed.weight}</span>:null}
            {breed?.life_span? <span><b>Average Life Span: </b>{breed.life_span}</span>:null}
            {breed?.breed_group? <span><b>Breed Group: </b>{breed.breed_group}</span>:null}
        </div>
    </div>
    )
}
export default BreedsPage