import { GET_UNIVERSITIES, GET_RSOS, GET_RSOS_ADMIN, CLEAR_RSOS, CLEAR_RSOS_ADMIN } from '../actions/constants';

const initalState = 
{
    universities: [],
    
    rsos: [{
        name: "No RSO's left to join",
        idRSO: 0
    }],

    rsosAdmin: [{
        name: "Public Event",
        idRSO: 0
    }]
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
        case GET_RSOS:
            return {
                ...state,
                rsos: action.payload.concat(state.rsos)
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
                rsosAdmin: [{
                    name: "Public Event",
                    idRSO: 0
                }]
            }
        default:
            return state;
    }
}