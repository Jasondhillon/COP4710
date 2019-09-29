import axios from 'axios';
import { returnErrors  } from "./errorActions";
import { CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_COMMENTS } from './constants';

export const createComment = (Comments_event_id, Comments_user_id, message) => (dispatch, getState) =>
{
    const body = JSON.stringify({Comments_event_id, Comments_user_id, message});
    
    axios.post('/api/comments/create', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Error adding comment'));
        });
}

export const editComment = (message, idComment) => (dispatch, getState) =>
{

    const body = JSON.stringify({message, idComment});
    console.log(body);
    
    axios.post('/api/comments/edit', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_COMMENT,
                payload: []
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Error editing comment'));
        });

    axios.get('/api/info/comments')
    .then(res => dispatch({
        type: GET_COMMENTS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'Error receiving event comments'));
    });
}

export const deleteComment = (idComment) => (dispatch, getState) =>
{
    
    const body = JSON.stringify(idComment);
    
    axios.post('/api/comments/delete', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_COMMENT,
                payload: idComment
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Error deleting comment'));
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