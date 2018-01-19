import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'

/* ------ Types and Action Creators ------ */

const { Types, Creators } = createActions({
  logoutUser: null,
  loginRequest: null,
  loginSuccess: null,
  loginFailure: null,
  loginRequest: null,
  loginSuccess: null,
  loginFailure: null,
  registerRequest: null,
  registerSuccess: null,
  registerFailure: null,
  loginFacebookRequest: null,
  loginFacebookSuccess: null,
  loginFacebookFailure: null,
  socialMediaAuthRequest: null,
  socialMediaAuthSuccess: null,
  socialMediaAuthFailure: null,
})

export const AuthTypes = Types
export default Creators

/* ---------- Initial State ---------- */

export const INITIAL_STATE = Immutable({
  userInfoAdded: false,
  loggedIn: false,
  accessToken: null,
  expiresIn: null,
  tokenType: null,
  scope: null,
  refreshToken: null,
  authError: false,
  redirectUrl: null
})


export const registerUser = (userObj) => {
  const body = {
    client_id: envConfig.Development.devClientId,
    client_secret: envConfig.Development.devClientSecret,
    grant_type: "password",
    ...userObj
  }

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
  const body = {
    client_id: envConfig.Development.devClientId,
    client_secret: envConfig.Development.devClientSecret,
    grant_type: 'password',
    ...userObj
  }

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

export const socialMediaAuth = (platform, userId) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET'.
    headers
  }

  return {
    types: [
      Types.SOCIAL_MEDIA_AUTH_REQUEST,
      Types.SOCIAL_MEDIA_AUTH_SUCCESS,
      Types.SOCIAL_MEDIA_AUTH_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch =>
      fetchFromApi(`auth/login/${platform}/?user_id=${userId}`)
  }
}


/* -------- Reducers -------- */

const handleUserLogout = (state, action) => {
  return INITIAL_STATE
}

const registerAccountRequest = (state = INITIAL_STATE, action) => {
  return state
}

const registerAccountSuccess = (state = INITIAL_STATE, action) => {
  const { data } = action.response
  return {
    ...state,
    userInfoAdded: true,
    loggedIn: true,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
    scope: data.scope,
    refreshToken: data.refresh_token,
    authError: false
  }
}

const registerAccountFailure = (state = INITIAL_STATE, action) => {
  return {
    userInfoAdded: false,
    authError: true
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
    tokenType: data.token_Type,
    scope: data.scope,
    refreshToken: data.refresh_token,
    authError: false
  }
}

const loginFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    authError: true
  }
}

const handleSocialMediaAuthRequest = (state, action) => {
    return state
}

const handleSocialMediaAuthSuccess = (state, action) => {
  return state
}

const handleSocialMediaAuthFailure = (state, action) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT_USER]: handleUserLogout,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGIN_FACEBOOK_REQUEST]: loginRequest,
  [Types.LOGIN_FACEBOOK_SUCCESS]: loginSuccess,
  [Types.LOGIN_FACEBOOK_FAILURE]: loginFailure,
  [Types.REGISTER_REQUEST]: registerAccountRequest,
  [Types.REGISTER_SUCCESS]: registerAccountSuccess,
  [Types.REGISTER_FAILURE]: registerAccountFailure,
  [Types.SOCIAL_MEDIA_AUTH_REQUEST]: handleSocialMediaAuthRequest,
  [Types.SOCIAL_MEDIA_AUTH_SUCCESS]: handleSocialMediaAuthSuccess,
  [Types.SOCIAL_MEDIA_AUTH_FAILURE]: handleSocialMediaAuthFailure,
})
