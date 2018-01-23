import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fbUserInfo: ['userInfo'],
  getUserRequest: null,
  getUserSuccess: null,
  getUserFailure: null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userId: null,
  userData: {
    name: '',
    picture: { data: {url: ''} }
  },
  interests: [],
  location: ''
})

export const getUserId = (accessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.GET_USER_REQUEST,
      Types.GET_USER_SUCCESS,
      Types.GET_USER_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/me/', init, dispatch)
  }
}

/* ------------- Reducers ------------- */
const handleFbUserInfoSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, userData: action.userInfo }
}

const handleGetUserRequest = (state, action) => {
  return state
}

const handleGetUserSuccess = (state, action) => {
  return {
    ...state,
    userId: action.response.data.id
  }
}

const handleGetUserFailure = (state, action) => {
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FB_USER_INFO]: handleFbUserInfoSuccess,
  [Types.GET_USER_REQUEST]: handleGetUserRequest,
  [Types.GET_USER_SUCCESS]: handleGetUserSuccess,
  [Types.GET_USER_FAILURE]: handleGetUserFailure,
})
