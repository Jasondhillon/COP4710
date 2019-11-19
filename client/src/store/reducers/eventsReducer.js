import { GET_PUBLIC_EVENTS, GET_PRIVATE_EVENTS, GET_RSO_EVENTS, GET_UNAPPROVED_EVENTS, APPROVE_EVENT, DENY_EVENT, ADD_UNAPPROVED_EVENT, CREATE_EVENT, CLEAR_EVENTS , CHECK_EVENT_TIME} from '../actions/constants';

const initalState = 
{
    events: [],
    unApprovedEvents: [],
    timeCheck: 0
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
                ...state,
                events: [],
                unApprovedEvents: []
            }
        case CREATE_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case GET_UNAPPROVED_EVENTS:
            return {
                ...state,
                unApprovedEvents: action.payload
            }
        case DENY_EVENT:
            return {
                ...state,
                unApprovedEvents: state.unApprovedEvents.filter(event => event.idEvent !== action.payload)
            }
        case APPROVE_EVENT:
            return {
                ...state,
                unApprovedEvents: state.unApprovedEvents.filter(event => event.idEvent !== action.payload)
            }
        case ADD_UNAPPROVED_EVENT:
            return {
                ...state,
                unApprovedEvents: [action.payload, ...state.unApprovedEvents]
            }
        case CHECK_EVENT_TIME:
            return {
                ...state,
                timeCheck: action.payload
            }
        default:
            return state;
    }
}