import React from "react"
import "./index.css"
import AddDogScreenShot from "../../images/ImagesForTT/AddDogScreenShot.png"
import HomePage from "../../images/ImagesForTT/UserHomePageScreenShot.png"
import AddActivity from "../../images/ImagesForTT/AddActivity.png"
import AddRoute from "../../images/ImagesForTT/MakenewRoute.png"
import ReRenderRoute from "../../images/ImagesForTT/WalkRouteRerender.png"
import BreedsPageImg from "../../images/ImagesForTT/BreedsPage.png"
import IndividualBreed from "../../images/ImagesForTT/IndividualBreed.png"
import makeActivityReoccuring from "../../images/ImagesForTT/MakeReoccuring.png"
import dogHomePage from "../../images/ImagesForTT/ScreenShotDogHomePage.png"
import changeDailyGoal from "../../images/ImagesForTT/goalDogScreenShot.png"

const FeaturesPage = () => {
    const featuresList = [{feature:"Add all your dogs and see their activities for the week", img: AddDogScreenShot, img2: HomePage},{feature: "See recommendations for your dog and change your dogs daily goal, edit dog information or change dog image", img:dogHomePage, img2:changeDailyGoal}, {feature:"Add Activities, add images to an activity and make activities reoccuring based on day of the week", img: AddActivity, img2:makeActivityReoccuring}, {feature:"Add the routes you take to get the distance and add that route to reoccuring activities", img: AddRoute, img2: ReRenderRoute}, {feature:"See information on Breeds", img: BreedsPageImg, img2: IndividualBreed} ]
    return (
        <div className="outer-page__container">
            <div>
                <h1>Features</h1>
                <h3>We Love all Dogs. Keep them happy and healthy.</h3>
                {featuresList.map((feature, i) => (
                    <div className="feature-container" key={i}>
                        <h3>{feature.feature}</h3>
                        <div>
                            <img src={feature.img} alt="feature"/>
                            <img src={feature.img2} alt="feature"/>
                        </div>
                    </div>

                ))}
            </div>

        </div>

    )
}
export default FeaturesPage