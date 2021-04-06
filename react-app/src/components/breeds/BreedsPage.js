import React, { useState, useEffect } from "react"
import "./index.css"
import BreedSuggester from "../autosuggest"
import {useSelector, useDispatch} from "react-redux"
import {NavLink, useParams, useHistory} from "react-router-dom"
import { getAllBreeds } from "../../store/breeds"

const BreedsPage = () => {
    let {breedid} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBreeds())
    },[])
    const user = useSelector(state => state.session.user);
    let breeds = useSelector(state=> state.breeds?.breeds?.breeds)
    const [breedId, setBreedId] = useState(-2)
    useEffect(()=>{
        if (breedId>0){
            history.push(`/breeds/${breedId}`)
        }

    },[breedId])
    return (
        <div className="Breeds-Page__container">
            <BreedSuggester setbreedId={setBreedId}/>
            <div className="breeds_list_outer__container">
            {breeds? breeds.map(breed => (
                <NavLink to={`/breeds/${breed.id}`}>
                <div className="breed-List__container clickable">
        <div>
            <div className="breed_name__container">
                <span className="breed_name">{breed?.name}</span>

            </div>
            <img src={breed?.breed_img_url} alt="breed"/>

        </div>
        <div className="breed_info">
            {breed?.temperament? <span><b>Temperament: </b>{breed.temperament}</span>:null}
            
        </div>
    </div>
                </NavLink>
            )):null}
            </div>
        </div>
    )
}
export default BreedsPage