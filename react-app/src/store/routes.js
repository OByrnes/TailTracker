import * as deepcopy from "deepcopy"

const GET_ROUTES = "routes/GETROUTES";

const getRoutes = (routes) => {
    return {
        type: GET_ROUTES,
        payload: routes
    }
}

export const getAllRoutes = () => async (dispatch) => {
    const response = await fetch("/api/dogroutes/all")
    const data = await response.json()
    if (response.ok){
        dispatch(getRoutes(data))
    }
    return response
}

let newState; 
export const RoutesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ROUTES:
            newState = deepcopy(state)
            newState.Routes = action.payload;
            return newState;
        default:
            return state;
    };
};
export default RoutesReducer;