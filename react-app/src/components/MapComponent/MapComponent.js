import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Geocode from 'react-geocode'
import deepcopy from 'deepcopy';
import uuid from 'react-uuid'

 
const SimpleMap= () => {
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [startingPosition,setStartingPosition] = useState({})
    const [currentPosition, setCurrentPosition] = useState({})
    const [newLat, setNewLat] = useState()
    const [markerList, setMarkerList] = useState({})
    

    
 
Geocode.setApiKey("AIzaSyAQmpgQmAYgF5E7rCJ8psBeMvagml03iZk");

// set response language. Defaults to english.
Geocode.setLanguage("en");




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
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat)
          setLong(lng);
          setCurrentPosition({lat, lng:long})
          let newMarkerList = deepcopy(markerList)
          newMarkerList.startingPoint = {lat, lng}
          setMarkerList(newMarkerList)
        },
        (error) => {
          console.error(error);
        }
      );
       
        
}

const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    let WHATTHEEVERLOVINGFUCK = e.domEvent.originalTarget.title
    markerList[WHATTHEEVERLOVINGFUCK] = {lat:lat, lng: lng}
  };
const addNewMarker = (e) =>{
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    let newMarkerList = deepcopy(markerList)
    newMarkerList[uuid()] = {lat, lng}
    setMarkerList(newMarkerList)
}
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAQmpgQmAYgF5E7rCJ8psBeMvagml03iZk"
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

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '300px', width: '300px' }}>
          <div>
              <input type="text" value={startingPosition} onChange={(e)=>setStartingPosition(e.target.value)}/>
              <button onClick={MakeMap}>Mark Starting Position</button>
          </div>
          <div>
              <button onClick={addNewMarker}>Add Marker</button>
          </div>
        {lat && currentPosition?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e)=>addNewMarker(e)}
          center={currentPosition}>
            {Object.keys(markerList).map(marker => (
               <Marker key={uuid()} position={markerList[marker]}
               title={marker}
               onDragEnd={(e)=> onMarkerDragEnd(e)}
               draggable={true} />
            ))}
         
        </GoogleMap>:null}
      </div>
    );

}
 
export default SimpleMap;