import axios from 'axios';
import { returnErrors  } from "./errorActions";

export const joinRSO = (RSO) => (dispatch, getState) =>
{
    axios.post('/api/rso/join', RSO, tokenConfig(getState))
        // .then(res => {
        // })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ' Error joining RSO'));
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