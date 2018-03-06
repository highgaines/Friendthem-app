import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

/* ------------- Actions -------------- */



/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginComplete: ['fbAccessToken'],
  logoutComplete: null,
  logoutUser: null,
})

export const FBAPITypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fbAccessToken: ''
})

/* ------------- Reducers ------------- */
const fbLoginComplete = (state = INITIAL_STATE, action) => {
  return state.set('fbAccessToken', action.fbAccessToken);
}

const fbLogoutComplete = (state = INITIAL_STATE, action) => {
  return state.set('fbAccessToken', null);
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_COMPLETE]: fbLoginComplete,
  [Types.LOGOUT_COMPLETE]: fbLogoutComplete,
  [Types.LOGOUT_USER]: handleUserLogout,
})
