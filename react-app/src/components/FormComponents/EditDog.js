import React, { useState} from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import logo from "../../images/TTLogo1png.png";


const EditDog = ({dog}) => {
    const [name, setName] = useState(dog.name)
    const [weight, setWeight] = useState(dog.weight)
    const [description, setDescription] = useState(dog.description)
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
        formData.append("weight", weight)
        formData.append("description", description)
        formData.append("user_id", user.id)
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        const res = await fetch(`/api/dogs/${dog.id}`, {
            method: "PATCH",
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
                <span className="form_TailTracker">Edit</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="name" required={true} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Dog's Name"/>
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
                <button className="form__button" type="submit">Edit Dog</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>

        </div>
    )

}
export default EditDog