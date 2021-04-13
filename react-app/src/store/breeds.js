import * as deepcopy from "deepcopy"

const GET_BREEDS = "breeds/GETBREEDS";

const getBreeds = (breeds) => {
    return {
        type: GET_BREEDS,
        payload: breeds
    }
}

export const getAllBreeds = () => async (dispatch) => {
    const response = await fetch("/api/breeds/")
    const data = await response.json()
    if (response.ok){
        dispatch(getBreeds(data))
    }
    return response
}

let newState; 
export const breedsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BREEDS:
            newState = deepcopy(state)
            newState.breeds = action.payload;
            return newState;
        default:
            return state;
    };
};
export default breedsReducer;