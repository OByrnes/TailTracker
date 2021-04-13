import React, {useEffect, useState} from "react"
import {useParams } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';
import { getAllRoutes } from "../../store/routes";
import "./index.css"


const RoutePage = () => {
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [currentPosition, setCurrentPosition] = useState({})
    const [activityRoute, setActivityRoute] = useState([])
   
    const [map, setMap] = useState(null)
    const dispatch = useDispatch()
    let {routeid} = useParams()
    useEffect(()=>{
        dispatch(getAllRoutes())
    },[])
    let routes = useSelector(state => state.routes?.Routes?.routes)
    let selectedRoute;
    if (routes){
        selectedRoute = routes.filter(route => route.id===Number(routeid) )[0]
    }
    useEffect(()=>{
        if(selectedRoute){
            let routeMarkerList = JSON.parse(selectedRoute.markerList)
            console.log(routeMarkerList)
            setLat(routeMarkerList.startingPoint.lat)
            setLong(routeMarkerList.startingPoint.lng)
            setCurrentPosition({lng:routeMarkerList.startingPoint.lng, lat:routeMarkerList.startingPoint.lat})
            let polylineRoute = []
            let markerListOrder = JSON.parse(selectedRoute.markerListOrder)
            markerListOrder.forEach(marker => {
                polylineRoute.push(routeMarkerList[marker])
            })
            setActivityRoute(polylineRoute)
        }
        
    }, [selectedRoute, long, lat])
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
      })
      const containerStyle = {
        width: '400px',
        height: '400px'
      };
      let center;
      if (lat !== 0){
        center ={
            lat: lat,
            lng: long
          };
      }
      
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
        <div className="home_page__container">
            <div>
                <h2>{selectedRoute?.name}</h2>
                <span>{selectedRoute?.distance.toFixed(2)} Miles</span>
            </div>
            <div>
            {lat > 0 && currentPosition ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={15}
          center={center}
          
          onUnmount={onUnmount}
          >
            <Polyline
            options={options}
            onDblClick={(e)=>onLoadPolyline(e)}
      path={activityRoute}
    />
            
            
         
        </GoogleMap>:null}
            </div>
            
        </div>
    )

}

export default RoutePage