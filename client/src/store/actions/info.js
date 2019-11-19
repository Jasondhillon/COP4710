import axios from 'axios';
import { returnErrors, clearErrors  } from "./errorActions";
import {GET_UNIVERSITIES, GET_COMMENTS, GET_RSOS, GET_RSOS_ADMIN, CLEAR_RSOS, CLEAR_RSOS_ADMIN } from './constants';

// Create a new university
export const createUniversity = (name) => (dispatch, getState) => 
{
    const body = JSON.stringify({name});
    axios.post('/api/info/newUniversity', body, tokenConfig(getState))
    .then(() => {
        dispatch(clearErrors());
        dispatch(getUniversities());
    })
    .catch(err => {
        dispatch(returnErrors("University already exists", err.response.status, 'Error creating university'));
    });
    
}

// Loads the list of universities
export const getUniversities = () => (dispatch) => {
    axios.get('/api/info/universities')
        .then(res => dispatch({
            type: GET_UNIVERSITIES,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Error receiving university information'));
        });
}

// Loads comments
export const getComments = () => (dispatch) => 
{
    axios.get('/api/info/comments')
    .then(res => dispatch({
        type: GET_COMMENTS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'Error receiving event comments'));
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