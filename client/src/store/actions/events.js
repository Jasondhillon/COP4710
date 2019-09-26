import axios from 'axios';
import { returnErrors  } from "./errorActions";
import { GET_PUBLIC_EVENTS, GET_PRIVATE_EVENTS, GET_RSO_EVENTS, CREATE_EVENT, CLEAR_EVENTS } from './constants';


export const getPublicEvents = ( university_id ) => dispatch =>
{
    const config =
    {
        headers:
        {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ university_id });

    axios.post('/api/events/public', body, config)
        .then(res => dispatch({
            type: GET_PUBLIC_EVENTS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ' EVENTS_PUBLIC_FAIL'));
        });

};

export const clearEvents = () => dispatch =>
{
    dispatch({
        type: CLEAR_EVENTS
    });
}

export const getPrivateEvents = ( university_id ) => dispatch =>
{
    const config =
    {
        headers:
        {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ university_id });

    axios.post('/api/events/private', body, config)
        .then(res => dispatch({
            type: GET_PRIVATE_EVENTS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ' EVENTS_PRIVATE_FAIL'));
        });

};

export const getRSOEvents = ( idUser, university_id ) => (dispatch, getState) =>
{
    const body = JSON.stringify({idUser, university_id});

    axios.post('/api/events/rso', body, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_RSO_EVENTS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ' Error retrieiving Public/Private/RSO events'));
        });

};

export const createEvent = ({ name, eventName, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved }) => (dispatch, getState) =>
{

    const body = JSON.stringify({name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved});

    
    axios.post('/api/events/create', body, tokenConfig(getState))
        .then(res => {

            if ({Events_RSO_id} !== 0)
            {
                const idEvent = res.data.insertId;
                const rating = 0;
                const event = ({ idEvent, eventName, name, category, description, time, date, location, phone, email, status, rating});

                dispatch({
                    type: CREATE_EVENT,
                    payload: event
                })
            }
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ' Error creating event'));
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

