import React from "react"
const SetGoal = ({setNewGoal,newDailyGoal,goalMessage,goalPuppyMessage,setNewDailyGoal, updatingGoal, closeSetActivityGoal, dog }) => {

    return (
        <div>
        {!dog.puppy?<div className="form_container">
                        <form onSubmit={setNewGoal}>
                        <div className="slidecontainer">
                                <input type="range" min="1" max="30" value={newDailyGoal} className="slider" id="myRange" onChange={(e)=>setNewDailyGoal(e.target.value)}/>
                                <span>{newDailyGoal}</span><span>{goalMessage}</span>
                                <span>Recommendation based on Breed{dog.breed?.avg_activity_level}</span>
                        </div>
                        <button type="submit">set new goal</button>

                        </form>

                    </div>:<div className="form_container">
                        <form onSubmit={setNewGoal}>
                        <div className="slidecontainer">
                                <span>Puppy goal</span>
                                <input type="range" min="1" max="30" value={newDailyGoal} className="slider" id="myRange" onChange={(e)=>setNewDailyGoal(e.target.value)}/>
                                <span>{newDailyGoal}</span><span>{goalPuppyMessage}</span>
                                <span>Recommendation based on Age{Math.floor(Number(dog.age.split(' ')[0])*10/6)}</span>
                        </div>
                        {updatingGoal?<div>Updating Goal....</div>:<button type="submit">set new goal</button>}

                        </form>

                    </div>}
                    </div>
    )
}
export default SetGoal