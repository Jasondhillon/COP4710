import axios from 'axios';
import { returnErrors  } from "./errorActions";
import { GET_UNIVERSITIES, GET_RSOS, GET_RSOS_ADMIN, CLEAR_RSOS, CLEAR_RSOS_ADMIN } from './constants';

// Loads the list of universities
export const getUniversities = () => (dispatch) => 
{
    axios.get('/api/info')
    .then(res => dispatch({
        type: GET_UNIVERSITIES,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'Error receiving university information'));
    });
    
}

// Gets the RSOs the user is not a part of 
export const getRSOs = ( id, university_id) => (dispatch, getState) => {
    const body = JSON.stringify({ id, university_id });
    axios.post('/api/info/rsos', body, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_RSOS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Error receiving RSO information'));
        })

}

export const clearRSOs = () => dispatch => {
    dispatch ({
        type: CLEAR_RSOS
    })
}



// Gets the RSOs the user is an admin of
export const getRSOsAdmin = (id) => (dispatch, getState) => 
{
    const body = JSON.stringify({id});
    axios.post('/api/info/adminRsos', body, tokenConfig(getState))
    .then(res => dispatch({
        type: GET_RSOS_ADMIN,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'Error receiving RSO admin information'));
    })
    
}


export const clearRSOsAdmin = () => dispatch => {
    dispatch ({
        type: CLEAR_RSOS_ADMIN
    })
}

export const tokenConfig = getState => {

    const token = getState().auth.token;

    const config =
    {
        headers:
        {
            "Content-type": "application/json",
        }
    }

    if (token)
        config.headers['x-auth-token'] = token;

    return config;
}