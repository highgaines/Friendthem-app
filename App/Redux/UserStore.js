import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fbUserInfo: ['userInfo'],
  updateInfo: ['userInfo'],
  getUserRequest: null,
  getUserSuccess: null,
  getUserFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userId: null,
  userData: {
    name: '',
    picture: { data: {url: null} },
    email: '',
    age: 26,
    phoneNumber: '3472917739',
    interests: ['Crypto', 'Flying Kites', 'Gaming'],
    location: 'New York',
    snapHandle: null
  }
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
    callApi: dispatch => fetchFromApi('profile/me/', init, dispatch)
  }
}

export const updateInfo = (field, content) => {
  return { type: Types.UPDATE_INFO, payload: { field, content } }
}

/* ------------- Reducers ------------- */
const handleFbUserInfoSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    userData: {
      ...state.userData,
      ...action.userInfo
    }
  }
}

const handleUpdateInfo = (state, action) => {
  const { field, content } = action.payload

  return {
    ...state,
    userData: {
      ...state.userData,
      [field]: content
    }
  }
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
  [Types.UPDATE_INFO]: handleUpdateInfo,
  [Types.GET_USER_REQUEST]: handleGetUserRequest,
  [Types.GET_USER_SUCCESS]: handleGetUserSuccess,
  [Types.GET_USER_FAILURE]: handleGetUserFailure
})
