import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom";
import SimpleMap from "../MapComponent/MapComponent"


const AddRouteForm = () => {
    return (
        <div className="outerPage__container">
        <div className="form_page_container">
            <SimpleMap /> 
        </div>
        </div>
    )
}
export default AddRouteForm