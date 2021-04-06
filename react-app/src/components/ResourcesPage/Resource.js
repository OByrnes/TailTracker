import React from 'react'

const Resource = () =>{
    const sources =["https://www.akc.org/expert-advice/nutrition/8-ways-to-help-your-overweight-dog/",'https://www.cesarsway.com/','https://dogsaholic.com/training/how-to-calm-down-a-dog.html','https://www.akc.org/expert-advice/training/help-my-dog-wont-stop-barking-while-home-alone/',"https://www.whole-dog-journal.com/behavior/is-my-dog-depressed/",'https://www.puppyleaks.com/dog-velcro-dog/']
    return (
        <div>
            {sources.map(source => (
                <a key={source} href={source}>{source}</a>
            ))}
        </div>
    )
}

export default Resource