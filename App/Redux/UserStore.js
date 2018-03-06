import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'
import Analytics from 'analytics-react-native'
const analytics = new Analytics(envConfig.Development.SegmentAPIKey)

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateInfo: ['field', 'content'],
  fbUserInfo: ['userInfo'],
  getUserRequest: null,
  getUserSuccess: null,
  getUserFailure: null,
  getFbPhotosRequest: null,
  getFbPhotosSuccess: null,
  getFbPhotosFailure: null,
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
  updateSettingsFailure: null,
  logoutUser: null,
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
  userPhotos: {},
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

// FETCH FB PHOTOS

export const getFBPhotos = (accessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.GET_FB_PHOTOS_REQUEST,
      Types.GET_FB_PHOTOS_SUCCESS,
      Types.GET_FB_PHOTOS_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('pictures/', init, dispatch)
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

export const updateSettings = (accessToken, setting, mode) => {
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
  return state.merge({
    userData: state.userData.merge(action.userInfo)
  });
}

// ------------------------------------------------------------------------ //
const handleUpdateInfo = (state, action) => {
  const { field, content } = action.payload

  return state.setIn(['userData', field], content);
}
// ------------------------------------------------------------------------ //

const handleGetUserRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleGetUserSuccess = (state, action) => {
  analytics.identify({
    userId: action.response.data.id,
    traits: action.data
  })

  return state.merge({
    userData: action.data,
    userId: action.response.data.id,
    fetching: false
  });
}
const handleGetUserFailure = (state, action) => {
  return state.set('fetching', false);
}

// ------------------------------------------------------------------------ //

const handleUpdateUserRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleUpdateUserSuccess = (state, action) => {
  analytics.track({
    userId: state.userId,
    event: 'Update User Success'
  })

  return state.merge({
    editableData: action.response.data,
    fetching: false
  });
}
const handleUpdateUserFailure = (state, action) => {
  return state.set('fetching', false);
}

// ------------------------------------------------------------------------ //

const handleUpdateUserPositionRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleUpdateUserPositionSuccess = (state, action) => {
  analytics.track({
    userId: state.userId,
    event: 'Update User Position Success'
  })
  return state.set('geoLocation', action.data.last_location);
}

const handleUpdateUserPositionFailure = (state, action) => {
  return state.set('fetching', false);
}

// ------------------------------------------------------------------------ //

const handleUpdateSnapRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleUpdateSnapSuccess = (state, action) => {
  return state
    .set('fetching', false)
    .setIn(['userData', 'snapHandle'], action.data.username);
}

const handleUpdateSnapFailure = (state, action) => {
  return state.set('fetching', false);
}

const handleUpdateSettingsRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleUpdateSettingsSuccess = (state, action) => {
  analytics.track({
    userId: state.userId,
    event: 'Update Settings Success'
  })
  return state.set('fetching', false);
}

const handleUpdateSettingsFailure = (state, action) => {
  return state.set('fetching', false);
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE
}

/*----------------- GET PHOTOS REDUCERS ---------------*/

const handleGetPhotosRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleGetPhotosSuccess = (state, action) => {
  return state.merge({
    userPhotos: action.response,
    fetching: false
  });
}

const handleGetPhotosFailure = (state, action) => {
  return state.set('fetching', false);
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_INFO]: handleUpdateInfo,
  [Types.FB_USER_INFO]: handleFbUserInfoSuccess,
  [Types.GET_USER_REQUEST]: handleGetUserRequest,
  [Types.GET_USER_SUCCESS]: handleGetUserSuccess,
  [Types.GET_USER_FAILURE]: handleGetUserFailure,
  [Types.GET_FB_PHOTOS_REQUEST]: handleGetPhotosRequest,
  [Types.GET_FB_PHOTOS_SUCCESS]: handleGetPhotosSuccess,
  [Types.GET_FB_PHOTOS_FAILURE]: handleGetPhotosFailure,
  [Types.UPDATE_INFO_REQUEST]: handleUpdateUserRequest,
  [Types.UPDATE_INFO_SUCCESS]: handleUpdateUserSuccess,
  [Types.UPDATE_INFO_FAILURE]: handleUpdateUserFailure,
  [Types.UPDATE_USER_POSITION_REQUEST]: handleUpdateUserPositionRequest,
  [Types.UPDATE_USER_POSITION_SUCCESS]: handleUpdateUserPositionSuccess,
  [Types.UPDATE_USER_POSITION_FAILURE]: handleUpdateUserPositionFailure,
  [Types.UPDATE_SNAP_REQUEST]: handleUpdateSnapRequest,
  [Types.UPDATE_SNAP_SUCCESS]: handleUpdateSnapSuccess,
  [Types.UPDATE_SNAP_FAILURE]: handleUpdateSnapFailure,
  [Types.UPDATE_SETTINGS_REQUEST]: handleUpdateSettingsRequest,
  [Types.UPDATE_SETTINGS_SUCCESS]: handleUpdateSettingsSuccess,
  [Types.UPDATE_SETTINGS_FAILURE]: handleUpdateSettingsFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
