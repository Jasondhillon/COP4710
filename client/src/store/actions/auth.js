import axios from 'axios';
import { returnErrors  } from "./errorActions";
import { USER_LOADING, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './constants';

// Loads in a user from a token
export const loadUser = () => (dispatch, getState) => 
{
    dispatch({ type: USER_LOADING});

    axios.get('/api/auth/',  tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        // console.log(err);
    })
    
}

export const register = ({ userName, password, auth_level, university_id, university_name}) => dispatch => 
{
    const config = 
    {
        headers: 
        {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ userName, password, auth_level, university_id, university_name});

    axios.post('/api/auth/createUser', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL,
        });
    });
}

export const logout = () =>
{
    return {
        type: LOGOUT_SUCCESS
    };
};

export const login = ({ userName, password }) => dispatch =>
{
    const config =
    {
        headers:
        {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ userName, password });

    axios.post('/api/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL,
            });
        });

};

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