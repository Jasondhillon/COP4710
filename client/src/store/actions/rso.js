import axios from 'axios';
import { returnErrors, clearErrors  } from './errorActions';

export const joinRSO = (RSO) => (dispatch, getState) =>
{
    axios.post('/api/rso/join', RSO, tokenConfig(getState))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ' Error joining RSO'));
        });
}

export const createRSO = ({name, approved, RSOs_admin_id, RSOs_university_id}) => (dispatch, getState) =>
{
    const body = JSON.stringify({name, approved, RSOs_admin_id, RSOs_university_id});
    
    axios.post('/api/rso/create', body, tokenConfig(getState))
    .then(() => {
        dispatch(clearErrors());
    })
    .catch( err => {
        dispatch(returnErrors("RSO already exists", err.response.status, 'Error creating RSO'));   
    });
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