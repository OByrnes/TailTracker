import React, {useEffect, useState} from 'react';
import { GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api';
import { useHistory } from "react-router-dom";
import Geocode from 'react-geocode'
import "./index.css"
import deepcopy from 'deepcopy';
import uuid from 'react-uuid'

 
const SimpleMap= () => {
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [routeName, setRouteName] = useState('')
    const [startingPosition,setStartingPosition] = useState('')
    const [currentPosition, setCurrentPosition] = useState({})
    const [newLat, setNewLat] = useState()
    const [ActivityDistance, setActivityDistance] = useState(0)
    const [markerList, setMarkerList] = useState({})
    const [activityRoute, setActivityRoute] = useState([])
    const [markerListOrder, setMarkerListOrder] = useState([])
    const [roundTrip, setRoundTrip] = useState(false)
    const history = useHistory()
    
    const addRouteToDatabase = async () => {
      
      let formData = new FormData()
      formData.append("name", routeName)
      formData.append("distance", ActivityDistance)
      formData.append("markerList", JSON.stringify(markerList))
      formData.append("markerListOrder", JSON.stringify(markerListOrder))
      formData.append("roundTrip", roundTrip)
      let res = await fetch("/api/dogroutes", {
        method: "POST",
        body: formData
      })
      if (res.ok){
        let newRouteRes = await res.json()
        history.push(`/routes/${newRouteRes.id}`)
        
      }
      else {
        console.log("error")
      }
    }

Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);


// set response language. Defaults to english.
Geocode.setLanguage("en");


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d/1.609;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

useEffect(()=>{
  let newActivityRoute =[]
  let distance =0;
for(let i=0; i< markerListOrder.length; i++){
  newActivityRoute.push(markerList[markerListOrder[i]])
  if(i >0){
    let lat1 = markerList[markerListOrder[i-1]].lat
    let lon1 =markerList[markerListOrder[i-1]].lng
    let lat2 = markerList[markerListOrder[i]].lat
    let lon2 =markerList[markerListOrder[i]].lng
    let distancebetweenpoints = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
    distance+=distancebetweenpoints
  }

}
if(roundTrip){
  distance = distance*2
}
setActivityDistance(distance)
setActivityRoute(newActivityRoute)

}, [markerList, setMarkerList, roundTrip])


// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


// Get address from latitude & longitude.
const MakeMap = () => {
    Geocode.fromAddress(startingPosition).then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location
          setLat(lat)
          setLong(lng);
          setCurrentPosition({lat, lng})
          let newMarkerList = deepcopy(markerList)
          newMarkerList.startingPoint = {lat, lng}
          let orderlist = ['startingPoint']
          setMarkerListOrder(orderlist)
          setMarkerList(newMarkerList)
        },
        (error) => {
          console.error(error);
        }
      );
       
        
}
const deleteLastPoint = () => {
  let newMarkerList = deepcopy(markerList)
  let newOrder = [...markerListOrder]
  let lastNode = newOrder.pop()
  delete newMarkerList[markerListOrder[lastNode]]
  setMarkerList(newMarkerList)
  setMarkerListOrder(newOrder)
  alert("You deleted the last marker!")

}

const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    let coords = e.domEvent.target.title
    markerList[coords] = {lat:lat, lng: lng}
  };
const addNewMarker = (e) =>{
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    let newMarkerList = deepcopy(markerList)
    let key = uuid()
    newMarkerList[key] = {lat, lng}
    let order = [...markerListOrder]
    order.push(`${key}`)
    setMarkerListOrder(order)
    setMarkerList(newMarkerList)
    
}
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',

    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY

  })
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: lat,
    lng: long
  };
  const [map, setMap] = React.useState(null)
 
  

const onLoadPolyline = e => {
  console.log('polyline: ', e)
};
  
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
 const options = {
  strokeColor: '#247BA0',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#247BA0',
  fillOpacity: 0.35,
  clickable: false,
  editable: true,
  visible: true,
  radius: 30000,
  zIndex: 3
};




    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">
        <div>
          <h2>Add A Route</h2>
        </div>
          <div>
            <div>
              <input type="text" value={routeName} placeholder="Name Your route" onChange={(e)=>setRouteName(e.target.value)}/>
              </div>
              <div>
              <input type="text" placeholder="address of the starting position" value={startingPosition} onChange={(e)=>setStartingPosition(e.target.value)}/>
              </div>
              <div id="button-holder">
              <button className="form__button map-button" id="starting-btn" disabled={!startingPosition} onClick={MakeMap}>Mark Starting Position</button>
              <button className="form__button map-button" id="delete-btn" disabled={!startingPosition} onClick={deleteLastPoint}>Delete the last Marker</button>
              </div>
              <div>
              <fieldset>
              <label className="container">
                Round Trip
                <input type="checkbox" value={true} onChange={(e)=>setRoundTrip(e.target.checked)}/>
                <span class="checkmark"></span>
              </label>
              </fieldset>
              </div>
          </div>
        
        <div style={{ height: '500px', width: '300px' }}>
        {lat > 0 && currentPosition ?<GoogleMap
          mapContainerStyle={containerStyle}
          clickableIcons={false}
          zoom={18}
          center={currentPosition}
          
          onUnmount={onUnmount}
          onClick={(e)=>addNewMarker(e)}
          >
            {Object.keys(markerList).map((marker) => (
              <>
               <Marker key={uuid()} position={markerList[marker]}
               title={marker}
               onDragEnd={(e)=> onMarkerDragEnd(e)}
               draggable={true}
               streetView={false} />
               
               </>
            ))}
            <Polyline
            options={options}
            onDblClick={(e)=>onLoadPolyline(e)}
      path={activityRoute}
    />
            
            
         
        </GoogleMap>:null}
        </div>
        <div>
          <span>{ActivityDistance.toFixed(2)} Miles</span>
          <button onClick={addRouteToDatabase}>Add This Route!</button>
        </div>
      </div>
    );
          
}
 
export default SimpleMap;
