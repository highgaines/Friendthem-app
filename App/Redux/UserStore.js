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
  updateUserPositionFailure: null,
  updateSnapRequest: null,
  updateSnapSuccess: null,
  updateSnapFailure: null,
  updateSettingsRequest: null,
  updateSettingsSuccess: null,
  updateSettingsFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  userId: null,
  userData: {
    username: '',
    name: '',
    picture: null,
    email: '',
    interests: ['Crypto', 'Flying Kites', 'Gaming'],
    location: 'New York',
    snapHandle: null,
    ghostMode: false,
    silenceNotifications: false,
    social_profiles: [],
    geoLocation: {}
  },
  editableData : {
    personal_email: '',
    age: null,
    occupation: '',
    hobbies: [],
    hometown: '',
    phone_number: '',
  },
  ghostModeOn: true,
  notificationsOn: true,
  fetching: false
})

/* ------------- Actions ------------- */

// THIS CAN BE USED TO GET ALL USER DATA
export const getUserInfo = (accessToken) => {
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

// GEOLOCATION POSITIONING

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

// EDIT PROFILE/UPDATE PROFILE INFORMATION

export const updateProfileInfo = (data, field, content, accessToken) => {
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

// SNAPCHAT INFO

export const updateSnapInfo = (provider, username, accessToken) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const body = {
    provider: provider,
    username: username
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.UPDATE_SNAP_REQUEST,
      Types.UPDATE_SNAP_SUCCESS,
      Types.UPDATE_SNAP_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('social_profile/', init, dispatch)
  }
}

// USER SETTINGS - GHOST MODE AND SILENCE NOTIFICATIONS

export const updateSettings = (setting, mode, accessToken) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const body = {
    [setting]: mode
  }

  const init = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.UPDATE_SETTINGS_REQUEST,
      Types.UPDATE_SETTINGS_SUCCESS,
      Types.UPDATE_SETTINGS_FAILURE
    ],
    shoudlCallApi: state => true,
    callApi: dispatch => fetchFromApi('profile/', init, dispatch)
  }
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

// ------------------------------------------------------------------------ //
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
// ------------------------------------------------------------------------ //

const handleGetUserRequest = (state, action) => {
  return {...state, fetching: true}
}

const handleGetUserSuccess = (state, action) => {
  return {
    ...state,
    userData: action.data,
    userId: action.response.data.id,
    fetching: false
  }
}
const handleGetUserFailure = (state, action) => {
  return {...state, fetching: false}
}

// ------------------------------------------------------------------------ //

const handleUpdateInfoRequest = (state, action) => {
  return {
    ...state,
    fetching: true
  }
}

const handleUpdateInfoSuccess = (state, action) => {

  return {
    ...state,
    editableData: action.response.data,
    fetching: false
  }
}
const handleUpdateInfoFailure = (state, action) => {
  return {
    ...state,
    fetching: false
  }
}

// ------------------------------------------------------------------------ //

const handleUpdateUserPositionRequest = (state, action) => {
  return {
    ...state,
    fetching: true
  }
}

const handleUpdateUserPositionSuccess = (state, action) => {
  return {
    ...state,
    geoLocation: action.data.last_location
  }
}

const handleUpdateUserPositionFailure = (state, action) => {
  return {
    ...state,
    fetching: false
  }
}

// ------------------------------------------------------------------------ //

const handleUpdateSnapRequest = (state, action) => {
  return {
    ...state,
    fetching: true
  }
}

const handleUpdateSnapSuccess = (state, action) => {
  return {
    ...state,
    fetching: false,
    userData: {
      ...state.userData,
      snapHandle: action.data.username
    }
  }
}

const handleUpdateSnapFailure = (state, action) => {
  return {
    ...state,
    fetching: false
  }
}

const handleUpdateSettingsRequest = (state, action) => {
  return {
    ...state,
    fetching: true
  }
}

const handleUpdateSettingsSuccess = (state, action) => {

  return {
    ...state,
    fetching: false
  }
}

const handleUpdateSettingsFailure = (state, action) => {
  return {
    ...state,
    fetching: false
  }
}

const handleUpdateSnapRequest = (state, action) => {
  return state
}

const handleUpdateSnapSuccess = (state, action) => {
  return {
    ...state,
    userData: {
      ...userData,
      snapHandle: action.data.username
    }
  }
}

const handleUpdateSnapFailure = (state, action) => {
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_INFO]: handleUpdateInfo,
  [Types.FB_USER_INFO]: handleFbUserInfoSuccess,
  [Types.GET_USER_REQUEST]: handleGetUserRequest,
  [Types.GET_USER_SUCCESS]: handleGetUserSuccess,
  [Types.GET_USER_FAILURE]: handleGetUserFailure,
  [Types.UPDATE_INFO_REQUEST]: handleUpdateInfoRequest,
  [Types.UPDATE_INFO_SUCCESS]: handleUpdateInfoSuccess,
  [Types.UPDATE_INFO_FAILURE]: handleUpdateInfoFailure,
  [Types.UPDATE_USER_POSITION_REQUEST]: handleUpdateUserPositionRequest,
  [Types.UPDATE_USER_POSITION_SUCCESS]: handleUpdateUserPositionSuccess,
  [Types.UPDATE_USER_POSITION_FAILURE]: handleUpdateUserPositionFailure,
  [Types.UPDATE_SNAP_REQUEST]: handleUpdateSnapRequest,
  [Types.UPDATE_SNAP_SUCCESS]: handleUpdateSnapSuccess,
  [Types.UPDATE_SNAP_FAILURE]: handleUpdateSnapFailure,
  [Types.UPDATE_SETTINGS_REQUEST]: handleUpdateSettingsRequest,
  [Types.UPDATE_SETTINGS_SUCCESS]: handleUpdateSettingsSuccess,
  [Types.UPDATE_SETTINGS_FAILURE]: handleUpdateSettingsFailure
})
