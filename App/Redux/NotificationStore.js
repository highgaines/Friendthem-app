import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deleteRow: ['rowMap', 'rowKey'],
  registerUserNotifRequest: null,
  registerUserNotifSuccess: null,
  registerUserNotifFailure: null,
  fetchNotificationsRequest: null,
  fetchNotificationsSuccess: null,
  fetchNotificationsFailure: null
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// notification dummy data
export const INITIAL_STATE = Immutable({
  notifications: [
    {
      key: 1,
      name: "Mickey Mouse",
      img: 'https://www.disneyclips.com/imagesnewb/images/mickey_smiling2.gif',
      message: "wants to connect on facebook"
    },
    {
      key: 2,
      name: "Donald Duck",
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Donald_Duck.svg/618px-Donald_Duck.svg.png',
      message: "just joined Friendthem"
     },
    {
      key: 3, name: "Goofy", img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Goofy.svg/1200px-Goofy.svg.png',
      message: "wants to connect on facebook"
    },
    {
      key: 4,
      name: "Sora",
      img: 'https://vignette.wikia.nocookie.net/kingdomhearts/images/5/59/Sora_%28Art%29_KH.png/revision/latest/scale-to-width-down/180?cb=20121114141242',
      message: "wants to follow you"
    }
  ],
  fetching: false,
  deviceId: null,
  pushNotifications: []
})

/* ------------- Selectors ------------- */


/* ------------- Actions ------------- */

export const deleteRowAction = rowKey => {
  return { type: Types.DELETE_ROW, payload: { rowKey } }
}

export const fetchNotifications = accessToken => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.FETCH_NOTIFICATIONS_REQUEST,
      Types.FETCH_NOTIFICATIONS_SUCCESS,
      Types.FETCH_NOTIFICATIONS_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('notifications/', init, dispatch)
  }
}

export const registerForPushNotif = (accessToken, deviceId) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const body = {
    device_id: deviceId
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.REGISTER_USER_NOTIF_REQUEST,
      Types.REGISTER_USER_NOTIF_SUCCESS,
      Types.REGISTER_USER_NOTIF_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('notifications/device/', init, dispatch)
  }
}

/* ------------- Reducers ------------- */

// DELETE NOTIFICATIONS

const DELETE_ROW = 'DELETE_ROW'

const handleDeleteRowSuccess = (state = INITIAL_STATE, action)  => {

  const { rowKey } = action.payload
  const newData = state.notifications.filter(item => item.key !== rowKey)

  return state.merge({ notifications: newData })
}

// REGISTER USER FOR NOTIFICATIONS

const handleRegisterNotifRequest = (state, action) => {
  return {...state, fetching: true}
}

const handleRegisterNotifSuccess = (state, action) => {
  const { device_id } = action.data
  return {
    ...state,
    deviceId: device_id,
    fetching: false
  }
}

const handleRegisterNotifFailure = (state, action) => {
  return {...state, fetching: false}
}

// FETCH NOTIFICATIONS

const handleFetchNotifRequest = (state, action) => {
  return {...state, fetching: true}
}

const handleFetchNotifSuccess = (state, action) => {
  const { data } = action
  return {
    ...state,
    pushNotifications: data,
    fetching: false
  }
}

const handleFetchNotifFailure = (state, action) => {
  return {...state, fetching: false}
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_ROW]: handleDeleteRowSuccess,
  [Types.REGISTER_USER_NOTIF_REQUEST]: handleRegisterNotifRequest,
  [Types.REGISTER_USER_NOTIF_SUCCESS]: handleRegisterNotifSuccess,
  [Types.REGISTER_USER_NOTIF_FAILURE]: handleRegisterNotifFailure,
  [Types.FETCH_NOTIFICATIONS_REQUEST]: handleFetchNotifRequest,
  [Types.FETCH_NOTIFICATIONS_SUCCESS]: handleFetchNotifSuccess,
  [Types.FETCH_NOTIFICATIONS_FAILURE]: handleFetchNotifFailure
})
