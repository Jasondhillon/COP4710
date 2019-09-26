import { GET_ERRORS, CLEAR_ERRORS } from "./constants";

// Puts errors into the state made by calling the errorReducer
export const returnErrors = (msg, status, id = null) => 
{
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
} 

export const clearErrors = () => 
{
    return {
        type: CLEAR_ERRORS
    }
}