import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateInfo: ['field', 'content'],
  fbUserInfo: ['userInfo'],
  getUserRequest: null,
  getUserSuccess: null,
  getUserFailure: null,
  updateInfoRequest: null,
  updateInfoSuccess: null,
  updateInfoFailure: null,
  updateUserPositionRequest: null,
  updateUserPositionSuccess: null,
  updateUserPositionFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userId: null,
  userData: {
    username: '',
    name: '',
    picture: { data: {url: null} },
    email: '',
    interests: ['Crypto', 'Flying Kites', 'Gaming'],
    location: 'New York',
    snapHandle: null,
    geoLocation: {}
  },
  editableData : {
    personal_email: '',
    age: null,
    occupation: '',
    hobbies: [],
    hometown: '',
    phone_number: '',
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

export const updateUserPosition = (accessToken, coords) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const body = {
    last_location: {
      lat: coords.latitude,
      lng: coords.longitude,
    }
  }

  const init = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.UPDATE_USER_POSITION_REQUEST,
      Types.UPDATE_USER_POSITION_SUCCESS,
      Types.UPDATE_USER_POSITION_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('profile/location/', init, dispatch)
  }
}

export const updateInfoRequest = (data, field, content, accessToken) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const body = {
    ...data,
    [field]: content
  }

  const init = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.UPDATE_INFO_REQUEST,
      Types.UPDATE_INFO_SUCCESS,
      Types.UPDATE_INFO_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('profile/', init, dispatch)
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

const handleUpdateUserRequest = (state, action) => {

  return state
}

const handleUpdateUserSuccess = (state, action) => {

  return {
    ...state,
    editableData: action.response.data
  }
}

const handleUpdateUserFailure = (state, action) => {
  return state
}

const handleUpdateUserPositionRequest = (state, action) => {
  return state
}

const handleUpdateUserPositionSuccess = (state, action) => {
  return {
    ...state,
    geoLocation: action.data.last_location
  }
}

const handleUpdateUserPositionFailure = (state, action) => {
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_INFO]: handleUpdateInfo,
  [Types.FB_USER_INFO]: handleFbUserInfoSuccess,
  [Types.GET_USER_REQUEST]: handleGetUserRequest,
  [Types.GET_USER_SUCCESS]: handleGetUserSuccess,
  [Types.GET_USER_FAILURE]: handleGetUserFailure,
  [Types.UPDATE_INFO_REQUEST]: handleUpdateUserRequest,
  [Types.UPDATE_INFO_SUCCESS]: handleUpdateUserSuccess,
  [Types.UPDATE_INFO_FAILURE]: handleUpdateUserFailure,
  [Types.UPDATE_USER_POSITION_REQUEST]: handleUpdateUserPositionRequest,
  [Types.UPDATE_USER_POSITION_SUCCESS]: handleUpdateUserPositionSuccess,
  [Types.UPDATE_USER_POSITION_FAILURE]: handleUpdateUserPositionFailure
})
