import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom";
import SimpleMap from "../MapComponent/MapComponent"


const AddRouteForm = () => {
    return (
        <div className="form_page_container">
            <SimpleMap /> 
        </div>
    )
}
export default AddRouteForm