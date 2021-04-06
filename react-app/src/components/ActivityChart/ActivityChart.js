import React, {useEffect, useState} from 'react'
import { Chart } from 'react-charts'
import { axisTypeUtc } from 'react-charts/dist/react-charts.development'
 
const ActivityChart = ({dogs}) =>{
  
  const[activityData, setData] = useState([])

  
  useEffect(()=>{
    if(!activityData.length){
      if (dogs.activities && dogs.activities[0].activityTypeObj){
        setData( dogs.activities.map(act => ({x:act.date, y:(Math.floor(act.activityTypeObj.exertion*Number(act.minutes)/6)) })))

      }
      
    }
    
  },[setData])
  
  console.log(activityData)
  const data = React.useMemo(
    () => [
      {
        label: dogs.name,
        data: activityData
      }
    ],
    []
  )
    const axes = React.useMemo(
      () => [
        { primary: true, type: axisTypeUtc, position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
      []
    )

 
    
    return (
      <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )


}

export default ActivityChart