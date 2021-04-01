import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import BreedSuggester from "../autosuggest"
import { getAllBreeds } from "../../store/breeds"
import "./index.css"
import logo from "../../images/TTLogo1png.png";


const AddaDog = () => {
    const [name, setName] = useState('')
    const [breedId, setbreedId] = useState(0)
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name)
        formData.append("age", age)
        formData.append("weight", weight)
        formData.append("description", description)
        formData.append("breed_id",breedId)
        formData.append("user_id", user.id)
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        const res = await fetch('/api/dogs', {
            method: "POST",
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
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className="form_page_container">
            <div className="login-page_header__container">
                <img alt="logo" src={logo} />
                <span className="form_TailTracker">Add your dog</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="name" required={true} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Dog's Name"/>
                </div>
                <BreedSuggester setbreedId={setbreedId}/>
                <div>
                    <input type="number" name="age" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Age"/>
                </div>
                <div>
                    <input type="number" name="weight" value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="Weight"/>
                </div>
                <div>
                    <textarea value={description} name="description" onChange={(e)=>setDescription(e.target.value)} placeholder="A little bit about your puppers..." />
                </div>
                <div>
                <input type="file" name="dogImg" accept="image/*" onChange={updateImage}/>
                </div>
                <button className="form__button" type="submit">Add your dog!</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>

        </div>
    )

}

export default AddaDog