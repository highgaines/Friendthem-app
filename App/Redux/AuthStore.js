import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'
import Analytics from 'analytics-react-native'

const analytics = new Analytics(envConfig.Development.SegmentAPIKey)
/* ------ Types and Action Creators ------ */

const { Types, Creators } = createActions({
  authErrorsRequest: null,
  authErrorsSuccess: null,
  authErrorsFailure: null,
  authErrorClear: null,
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
  refreshAuthTokenRequest: null,
  refreshAuthTokenSuccess: null,
  refreshAuthTokenFailure: null
})

export const AuthTypes = Types
export default Creators

/* ---------- Initial State ---------- */

export const INITIAL_STATE = Immutable({
  loggedIn: false,
  accessToken: null,
  tokenType: null,
  scope: null,
  refreshToken: null,
  expiresIn: null,
  userInfoAdded: false,
  authError: false,
  redirectUrl: null,
  authErrors: []
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

export const loginByFacebook = (userObj, accessToken = null) => {
  const body = { ...userObj }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  accessToken ? headers.append('Authorization', `Bearer ${accessToken}`) : null

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

export const socialMediaAuth = (platform, userId, apiAccessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${apiAccessToken}`)
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
      fetchFromApi(`auth/login/${platform}/?user_id=${userId}`, init, dispatch)
  }
}

export const socialMediaAuthErrors = (accessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.AUTH_ERRORS_REQUEST,
      Types.AUTH_ERRORS_SUCCESS,
      Types.AUTH_ERRORS_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/me/tokens/errors/', init, dispatch)
  }
}

export const clearAuthErrors = () => {
  return { type: Types.AUTH_ERROR_CLEAR }
}

export const refreshAuthToken = refreshToken => {
  const body = {
    client_id: envConfig.Development.devClientId,
    client_secret: envConfig.Development.devClientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
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
      Types.REFRESH_AUTH_TOKEN_REQUEST,
      Types.REFRESH_AUTH_TOKEN_SUCCESS,
      Types.REFRESH_AUTH_TOKEN_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/token/', init, dispatch)
  }
}

/* -------- Reducers -------- */

const handleUserLogout = (state, action) => {
  return INITIAL_STATE;
}

const registerAccountRequest = (state = INITIAL_STATE, action) => {
  return state;
}

const registerAccountSuccess = (state = INITIAL_STATE, action) => {
  const { data } = action.response

  return state.merge({
    userInfoAdded: true,
    loggedIn: true,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
    scope: data.scope,
    refreshToken: data.refresh_token,
    authError: false
  });
}

const registerAccountFailure = (state = INITIAL_STATE, action) => {
  return state.merge({
    userInfoAdded: false,
    authError: true
  });
}

const loginRequest = (state = INITIAL_STATE, action) => {
  return state
}

const loginSuccess = (state = INITIAL_STATE, action) => {
  const { data } = action

  return state.merge({
    loggedIn: true,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.token_Type,
    scope: data.scope,
    refreshToken: data.refresh_token,
    authError: false
  });
}

const loginFailure = (state = INITIAL_STATE, action) => {
  return state.set('authError', true);
}

const handleSocialMediaAuthRequest = (state, action) => {
  return state;
}

const handleSocialMediaAuthSuccess = (state, action) => {
  return state;
}

const handleSocialMediaAuthFailure = (state, action) => {
  return state;
}

const handleRefreshAuthTokenRequest = (state, action) => {
  return state;
}

const handleRefreshAuthTokenSuccess = (state, action) => {
  const { data } = action;

  return state.merge({
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.token_Type,
    scope: data.scope,
    refreshToken: data.refresh_token
  });
}

const handleRefreshAuthTokenFailure = (state, action) => {
  return state;
}

const handleAuthErrorsRequest = (state, action) => {
  return state
}

const handleAuthErrorsSuccess = (state, action) => {
  return state.set('authErrors', action.response.data)
}

const handleAuthErrorsFailure = (state, action) => {
  return state
}

const handleClearAuthErrors = (state, action) => {
  return state.set('authErrors', Immutable([]))
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_ERRORS_REQUEST]: handleAuthErrorsRequest,
  [Types.AUTH_ERRORS_SUCCESS]: handleAuthErrorsSuccess,
  [Types.AUTH_ERRORS_FAILURE]: handleAuthErrorsFailure,
  [Types.AUTH_ERROR_CLEAR]: handleClearAuthErrors,
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
  [Types.REFRESH_AUTH_TOKEN_REQUEST]: handleRefreshAuthTokenRequest,
  [Types.REFRESH_AUTH_TOKEN_SUCCESS]: handleRefreshAuthTokenSuccess,
  [Types.REFRESH_AUTH_TOKEN_FAILURE]: handleRefreshAuthTokenFailure
})
