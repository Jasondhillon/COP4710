import { GET_PUBLIC_EVENTS, GET_PRIVATE_EVENTS, GET_RSO_EVENTS, GET_EVENTS_APPROVAL, CREATE_EVENT, CLEAR_EVENTS } from '../actions/constants';

const initalState = 
{
    events: [],
    eventsApproval: [],
}

export default function(state = initalState, action)
{
    switch(action.type)
    {
        case GET_PUBLIC_EVENTS:
        case GET_PRIVATE_EVENTS:
        case GET_RSO_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case CLEAR_EVENTS:
            return {
                events: []
            }
        case CREATE_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case GET_EVENTS_APPROVAL:
            return {
                ...state,
                eventsApproval: action.payload
            }
        default:
            return state;
    }
}