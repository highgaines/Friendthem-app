import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'

/* ------ Types and Action Creators ------ */

const { Types, Creators } = createActions({
  registerRequest: null,
  registerSuccess: null,
  registerFailure: null,
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
      TYPES.REGISTER_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/register/', init, dispatch)
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
  accessToken: null,
  expiresIn: null,
  tokenType: null,
  scope: null,
  refreshToken: null
})


/* -------- Reducers -------- */

export const registerAccount = (state = INITIAL_STATE, action) => {
  const { data } = action.userObj
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

const handleRedirectSuccess = (state, action) => {
  debugger
  return state
}

const handleRedirectFailure = (state, action) => {
  debugger
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REDIRECT_SUCCESS]: handleRedirectSuccess,
  [Types.REDIRECT_FAILURE]: handleRedirectFailure,
})
