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
  getMyPicsRequest: null,
  getMyPicsSuccess: null,
  getMyPicsFailure: null,
  deletePicRequest: null,
  deletePicSuccess: null,
  deletePicFailure: null,
  addPicRequest: null,
  addPicSuccess: null,
  addPicFailure: null,
  progressUpdate: null,
  editPicRequest: null,
  editPicSuccess: null,
  editPicFailure: null,
  updateInfoRequest: null,
  updateInfoSuccess: null,
  updateInfoFailure: null,
  updateUserPositionRequest: null,
  updateUserPositionSuccess: null,
  updateUserPositionFailure: null,
  updateSnapRequest: null,
  updateSnapSuccess: null,
  updateSnapFailure: null,
  editSnapRequest: null,
  editSnapSuccess: null,
  editSnapFailure: null,
  updatePasswordRequest: null,
  updatePasswordSuccess: null,
  updatePasswordFailure: null,
  updateSettingsRequest: null,
  updateSettingsSuccess: null,
  updateSettingsFailure: null,
  updateTutorialRequest: null,
  updateTutorialSuccess: null,
  updateTutorialFailure: null,
  logoutUser: null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  isFetchingInitialUser: false,
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
    tutorial_complete: false
  },
  userPhotos: {},
  ghostModeOn: true,
  notificationsOn: true,
  passwordUpdated: false,
  updateProgress: 0,
  fetchingMyPics: false,
  passwordUpdated: false,
  myPictures: []
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
    callApi: dispatch => fetchFromApi('pictures/facebook/', init, dispatch)
 }
}

// FETCH MY PICS

export const getMyPics = (accessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.GET_MY_PICS_REQUEST,
      Types.GET_MY_PICS_SUCCESS,
      Types.GET_MY_PICS_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('pictures/', init, dispatch)
  }
}

// DELETE ONE OF MY PICS

export const deletePic = (accessToken, pictureId) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: "DELETE",
    headers
  }

  return {
    types: [
      Types.DELETE_PIC_REQUEST,
      Types.DELETE_PIC_SUCCESS,
      Types.DELETE_PIC_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi(`pictures/${pictureId}/`, init, dispatch)
  }
}

// POST NEW PIC

export const addPic = (accessToken, source) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const body = {
    url: source
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.ADD_PIC_REQUEST,
      Types.ADD_PIC_SUCCESS,
      Types.ADD_PIC_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('pictures/', init, dispatch)
  }
}

export const uploadProgress = (data) => {
  return { type: Types.PROGRESS_UPDATE, payload: { data } }
}

// EDIT PIC

export const editPic = (accessToken, source, picId) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const body = {
    url: source
  }

  const init = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.EDIT_PIC_REQUEST,
      Types.EDIT_PIC_SUCCESS,
      Types.EDIT_PIC_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi(`pictures/${picId}/`, init, dispatch)
  }
}

// GEOLOCATION POSITIONING

export const updateUserPosition = (accessToken, coords) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

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
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

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
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

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

export const editSnapInfo = (provider, username, accessToken) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const body = {
    provider: provider,
    username: username
  }

  const init = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.EDIT_SNAP_REQUEST,
      Types.EDIT_SNAP_SUCCESS,
      Types.EDIT_SNAP_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('social_profile/', init, dispatch)
  }
}

// USER SETTINGS - GHOST MODE AND SILENCE NOTIFICATIONS

export const updateSettings = (accessToken, setting, mode) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

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

export const updatePassword = (accessToken, oldPassword, newPassword) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const body ={
    client_id: envConfig.Development.devClientId,
    client_secret: envConfig.Development.devClientSecret,
    old_password: oldPassword,
    new_password: newPassword
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.UPDATE_PASSWORD_REQUEST,
      Types.UPDATE_PASSWORD_SUCCESS,
      Types.UPDATE_PASSWORD_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('auth/change_password/', init, dispatch)
  }
}

export const updateTutorialStatus = (accessToken, tutorialName, completed) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const body = {
    `${tutorialName}`: completed
  }

  const init = {
    method: 'PATCH',
    headers: headers
    body: JSON.stringify(body),

  }

  return {
    types: [
      Types.UPDATE_TUTORIAL_REQUEST,
      Types.UPDATE_TUTORIAL_SUCCESS,
      Types.UPDATE_TUTORIAL_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('/profile/tutorial/', init, dispatch)
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
  return state.set('isFetchingInitialUser', true);
}

const handleGetUserSuccess = (state, action) => {
  analytics.identify({
    userId: action.response.data.id,
    traits: action.data
  })

  return state.merge({
    userData: action.data,
    editableData: action.data,
    userId: action.response.data.id,
    isFetchingInitialUser: false
  });
}
const handleGetUserFailure = (state, action) => {
  return state.set('isFetchingInitialUser', false);
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
  return state.merge({
    'geoLocation': action.data.last_location,
    'fetching': false
  });
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

const handleEditSnapRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleEditSnapSuccess = (state, action) => {
  return state
    .set('fetching', false)
    .setIn(['userData', 'snapHandle'], action.data.username);
}

const handleEditSnapFailure = (state, action) => {
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
  return state.set('fetchingMyPics', true);
}

const handleGetPhotosSuccess = (state, action) => {
  return state.merge({
    userPhotos: action.response,
    fetchingMyPics: false
  });
}

const handleGetPhotosFailure = (state, action) => {
  return state.set('fetchingMyPics', false);
}

/*----------------- UPDATE PASSWORD REDUCERS  ---------------*/

const handleUpdatePWRequest = (state, action) => {
  return state.merge({ requestingPWUpdate: true })
}

const handleUpdatePWSuccess = (state, action) => {
  return state.merge({
    requestingPWUpdate: false,
    passwordUpdated: true
  })
}

const handleUpdatePWFailure = (state, action) => {
  return state.merge({ passwordUpdated: false, requestingPWUpdate: false})
}

/*----------------- GET PICS REDUCERS  ---------------*/

const handleGetMyPicsRequest = (state, action) => {
  return state
}

const handleGetMyPicsSuccess = (state, action) => {
  return state.set('myPictures', action.data)
}

const handleGetMyPicsFailure = (state, action) => {
  return state
}

/*----------------- DELETE PIC REDUCERS  ---------------*/

const handleDeletePicRequest = (state, action) => {
  return state
}

const handleDeletePicSuccess = (state, action) => {
  return state.set('fetchingMyPics', false).set('myPictures', action.data)
}

const handleDeletePicFailure = (state, action) => {
  return state
}

/*----------------- ADD PIC REDUCERS  ---------------*/

const handleAddPicRequest = (state, action) => {
  return state.set('fetchingMyPics', true)
}

const handleAddPicSuccess = (state, action) => {
  return state.update('myPictures', picArr => picArr.concat([action.data])).merge({'fetchingMyPics': false})
}

const handleAddPicFailure = (state, action) => {
  return state.set('fetchingMyPics', false)
}

/*----------------- EDIT PIC REDUCERS  ---------------*/

const handleEditPicRequest = (state, action) => {
  return state.set('fetchingMyPics', true)
}

const handleEditPicSuccess = (state, action) => {
  return state.update('myPictures', picArr => picArr.concat([action.data])).merge({'fetchingMyPics': false})
}

const handleEditPicFailure = (state, action) => {
  return state.set('fetchingMyPics', false)
}

const handleProgressUpdate = (state, action) => {
  const { data } = action.payload
  return state.merge({ updateProgress: data })
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
  [Types.GET_MY_PICS_REQUEST]: handleGetMyPicsRequest,
  [Types.GET_MY_PICS_SUCCESS]: handleGetMyPicsSuccess,
  [Types.GET_MY_PICS_FAILURE]: handleGetMyPicsFailure,
  [Types.DELETE_PIC_REQUEST]: handleDeletePicRequest,
  [Types.DELETE_PIC_SUCCESS]: handleDeletePicSuccess,
  [Types.DELETE_PIC_FAILURE]: handleDeletePicFailure,
  [Types.ADD_PIC_REQUEST]: handleAddPicRequest,
  [Types.ADD_PIC_SUCCESS]: handleAddPicSuccess,
  [Types.ADD_PIC_FAILURE]: handleAddPicFailure,
  [Types.PROGRESS_UPDATE]: handleProgressUpdate,
  [Types.EDIT_PIC_REQUEST]: handleEditPicRequest,
  [Types.EDIT_PIC_SUCCESS]: handleEditPicSuccess,
  [Types.EDIT_PIC_FAILURE]: handleEditPicFailure,
  [Types.UPDATE_INFO_REQUEST]: handleUpdateUserRequest,
  [Types.UPDATE_INFO_SUCCESS]: handleUpdateUserSuccess,
  [Types.UPDATE_INFO_FAILURE]: handleUpdateUserFailure,
  [Types.UPDATE_USER_POSITION_REQUEST]: handleUpdateUserPositionRequest,
  [Types.UPDATE_USER_POSITION_SUCCESS]: handleUpdateUserPositionSuccess,
  [Types.UPDATE_USER_POSITION_FAILURE]: handleUpdateUserPositionFailure,
  [Types.UPDATE_SNAP_REQUEST]: handleUpdateSnapRequest,
  [Types.UPDATE_SNAP_SUCCESS]: handleUpdateSnapSuccess,
  [Types.UPDATE_SNAP_FAILURE]: handleUpdateSnapFailure,
  [Types.EDIT_SNAP_REQUEST]: handleEditSnapRequest,
  [Types.EDIT_SNAP_SUCCESS]: handleEditSnapSuccess,
  [Types.EDIT_SNAP_FAILURE]: handleEditSnapFailure,
  [Types.UPDATE_PASSWORD_REQUEST]: handleUpdatePWRequest,
  [Types.UPDATE_PASSWORD_SUCCESS]: handleUpdatePWSuccess,
  [Types.UPDATE_PASSWORD_FAILURE]: handleUpdatePWFailure,
  [Types.UPDATE_SETTINGS_REQUEST]: handleUpdateSettingsRequest,
  [Types.UPDATE_SETTINGS_SUCCESS]: handleUpdateSettingsSuccess,
  [Types.UPDATE_SETTINGS_FAILURE]: handleUpdateSettingsFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
