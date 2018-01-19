import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'

/* ------ Types and Action Creators ------ */

const { Types, Creators } = createActions({
  logoutUser: null,
  getUserTokenRequest: null,
  getUserTokenSuccess: null,
  getUserTokenFailure: null,
  socialMediaAuthSuccess: null,
})

export const TokenTypes = Types
export default Creators

/* ---------- Initial State ---------- */

export const INITIAL_STATE = Immutable({
  platforms: [],
  needsFetchTokens: false,
  authRedirectUrl: null
})

export const getUserTokens = (accessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.GET_USER_TOKEN_REQUEST,
      Types.GET_USER_TOKEN_SUCCESS,
      Types.GET_USER_TOKEN_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/me/tokens/', init, dispatch)
  }
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE
}

const handleSocialMediaSuccess = (state, action) => {
  return {
    ...state,
    authRedirectUrl: action.data.redirect_url
  }
}

const handleGetUserTokenRequest = (state, action) => {
  return state
}

const handleGetUserTokenSuccess = (state, action) => {
  return {
    ...state,
    needsFetchTokens: false
  }
}

const handleGetUserTokenFailure = (state, action) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT_USER]: handleUserLogout,
  [Types.GET_USER_TOKEN_REQUEST]: handleGetUserTokenRequest,
  [Types.GET_USER_TOKEN_SUCCESS]: handleGetUserTokenSuccess,
  [Types.GET_USER_TOKEN_FAILURE]: handleGetUserTokenFailure,
  [Types.SOCIAL_MEDIA_AUTH_SUCCESS]: handleSocialMediaSuccess,
})
