import { GET_UNIVERSITIES, GET_COMMENTS, GET_RSOS, GET_RSOS_ADMIN, CLEAR_RSOS, CLEAR_RSOS_ADMIN, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from '../actions/constants';

const initalState = 
{
    universities: [],
    
    rsos: [{
        idRSO: 0,
        name: "No RSO's left to join",
        approved: 0
    }],

    rsosAdmin: [{
        idRSO: 0,
        name: "Public Event (Pending approval of SuperAdmin)",
        approved: 0
    }],

    comments: []
}

export default function(state = initalState, action)
{
    switch(action.type)
    {
        case GET_UNIVERSITIES:
            return {
                ...state,
                universities: action.payload
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments : action.payload
            }
        case CREATE_COMMENT:
            return {
                ...state,
                comments : [action.payload, ...state.comments]
            }
        case EDIT_COMMENT:
            return {
                ...state,
               comments : []
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments : state.comments.filter(comment => comment.idComment !== action.payload)
            }
        case GET_RSOS:
            return {
                ...state,
                rsos: action.payload.filter(rso => rso.idRSO !== 42).concat(state.rsos)
            }
        case CLEAR_RSOS:
            return {
                ...state,
                rsos: [{
                    name: "No RSO's left to join",
                    idRSO: 0
                }]
            }
        case GET_RSOS_ADMIN:
            return {
                ...state,
                rsosAdmin: action.payload.concat(state.rsosAdmin)
            }
        case CLEAR_RSOS_ADMIN:
            return {
                ...state,
                rsosAdmin: []
            }
        default:
            return state;
    }
}