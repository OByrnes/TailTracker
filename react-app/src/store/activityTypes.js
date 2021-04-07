import * as deepcopy from "deepcopy"

const GET_ACTIVITYTYPES = "activities/GETACTIVITYTYPES";

const getActivityTypes = (activityTypes) => {
    return {
        type: GET_ACTIVITYTYPES,
        payload: activityTypes
    }
}

export const getAllActivityTypes = () => async (dispatch) => {
    const response = await fetch("/api/activities/activitytypes")
    const data = await response.json()
    if (response.ok){
        dispatch(getActivityTypes(data))
    }
    return response
}

let newState; 
export const activityTypesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACTIVITYTYPES:
            newState = deepcopy(state)
            newState.activityTypes = action.payload;
            return newState;
        default:
            return state;
    };
};
export default activityTypesReducer;