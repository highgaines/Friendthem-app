import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'

/* ------ Types and Action Creators ------ */

const { Types, Creators } = createActions({
  registerRequest: null,
  registerSuccess: null,
  registerFailure: null,
  loginRequest: null,
  loginSuccess: null,
  loginFailure: null,
  loginFacebookRequest: null,
  loginFacebookSuccess: null,
  loginFacebookFailure: null,
  redirectRequest: null,
  redirectSuccess: null,
  redirectFailure: null,
})

export const AuthTypes = Types
export default Creators

export const registerUser = (userObj) => {
  const body = { ...userObj }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.REGISTER_REQUEST,
      Types.REGISTER_SUCCESS,
      Types.REGISTER_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/register/', init, dispatch)
  }
}

export const login = (userObj) => {
  const body = { ...userObj }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const init= {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.LOGIN_REQUEST,
      Types.LOGIN_SUCCESS,
      Types.LOGIN_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/token/', init, dispatch)
  }
}

export const loginByFacebook = (userObj) => {
  const body = { ...userObj }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const init= {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.LOGIN_FACEBOOK_REQUEST,
      Types.LOGIN_FACEBOOK_SUCCESS,
      Types.LOGIN_FACEBOOK_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/convert-token/', init, dispatch)
  }
}

export const testRedirect = () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.REDIRECT_REQUEST,
      Types.REDIRECT_SUCCESS,
      Types.REDIRECT_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/register/', init, dispatch)
  }
}


/* ---------- Initial State ---------- */

export const INITIAL_STATE = Immutable({
  userInfoAdded: false,
  loggedIn: false,
  accessToken: null,
  expiresIn: null,
  tokenType: null,
  scope: null,
  refreshToken: null
})


/* -------- Reducers -------- */

const registerAccountRequest = (state = INITIAL_STATE, action) => {
  return state
}

const registerAccountSuccess = (state = INITIAL_STATE, action) => {
  const { data } = action.response
  return {
    ...state,
    userInfoAdded: true,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.tokenType,
    scope: data.scope,
    refreshToken: data.refreshToken
  }
}

const registerAccountFailure = (state = INITIAL_STATE, action) => {
  return {
    userInfoAdded: false
  }
}

const loginRequest = (state = INITIAL_STATE, action) => {
  return state
}

const loginSuccess = (state = INITIAL_STATE, action) => {
  const { data } = action
  return {
    ...state,
    loggedIn: true,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.tokenType,
    scope: data.scope,
    refreshToken: data.refreshToken
  }
}

const loginFailure = (state = INITIAL_STATE, action) => {
  console.log(action)
  return state
}

const handleRedirectSuccess = (state, action) => {
  debugger
  return state
}

const handleRedirectFailure = (state, action) => {
  debugger
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: registerAccountRequest,
  [Types.REGISTER_SUCCESS]: registerAccountSuccess,
  [Types.REGISTER_FAILURE]: registerAccountFailure,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGIN_FACEBOOK_REQUEST]: loginRequest,
  [Types.LOGIN_FACEBOOK_SUCCESS]: loginSuccess,
  [Types.LOGIN_FACEBOOK_FAILURE]: loginFailure,
  [Types.REDIRECT_SUCCESS]: handleRedirectSuccess,
  [Types.REDIRECT_FAILURE]: handleRedirectFailure,
})
