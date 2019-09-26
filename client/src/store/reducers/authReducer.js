import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/constants';

const initialState =
{
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null

};

export default function(state = initialState, action)
{
  switch(action.type)
  {
      case USER_LOADING:
          return {
              ...state,
              isLoading: true
          };
      case USER_LOADED:
          return {
              ...state,
              user: action.payload,
              isAuthenticated: true,
              isLoading: false
          };
      case LOGIN_SUCCESS:
          localStorage.setItem('token', action.payload.token);
          return {
              ...state,
              ...action.payload,
              user: action.payload.user,
              isAuthenticated: true,
              isLoading: false
          };
      case REGISTER_SUCCESS:
          localStorage.setItem('token', action.payload.token);
          return {
              ...state,
              ...action.payload,
              user: action.payload.user,
              isAuthenticated: true,
              isLoading: false,
          };
      case LOGOUT_SUCCESS:
          localStorage.removeItem('token');
          return {
              ...state,
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false
          };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
          return {
              ...state,
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false
          };
      default:
          return state;
  }
}

