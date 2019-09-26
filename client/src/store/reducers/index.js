import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import infoReducer from './infoReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    info: infoReducer,
    events: eventsReducer
})
