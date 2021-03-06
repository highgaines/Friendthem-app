import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  logoutUser: null,
  deleteRow: ['rowMap', 'rowKey'],
  registerUserNotifRequest: null,
  registerUserNotifSuccess: null,
  registerUserNotifFailure: null,
  fetchNotificationsRequest: null,
  fetchNotificationsSuccess: null,
  fetchNotificationsFailure: null,
  deleteNotificationRequest: null,
  deleteNotificationSuccess: null,
  deleteNotificationFailure: null
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// notification dummy data
export const INITIAL_STATE = Immutable({
  notifications: [],
  fetching: false,
  deviceId: null
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

export const deleteNotification = (accessToken, notifId) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const init = {
    method: 'DELETE',
    headers
  }

  return {
    types: [
      Types.DELETE_NOTIFICATION_REQUEST,
      Types.DELETE_NOTIFICATION_SUCCESS,
      Types.DELETE_NOTIFICATION_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi(`notifications/${notifId}/`, init, dispatch)
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
  return state.set('fetching', true);
}

const handleRegisterNotifSuccess = (state, action) => {
  const { device_id } = action.data

  return state.merge({
    deviceId: device_id,
    fetching: false
  });
}

const handleRegisterNotifFailure = (state, action) => {
  return state.set('fetching', false);
}

// FETCH NOTIFICATIONS

const handleFetchNotifRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleFetchNotifSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    notifications: data,
    fetching: false
  });
}

const handleFetchNotifFailure = (state, action) => {
  return state.set('fetching', false);
}

// DELETE NOTIFICATIONS

const handleDeleteNotifRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleDeleteNotifSuccess = (state, action) => {
  return state.set('fetching', false);
}

const handleDeleteNotifFailure = (state, action) => {
  return state.set('fetching', false);
}

// LOGOUT
const handleUserLogout = (state, action) => {
  return INITIAL_STATE;
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_ROW]: handleDeleteRowSuccess,
  [Types.REGISTER_USER_NOTIF_REQUEST]: handleRegisterNotifRequest,
  [Types.REGISTER_USER_NOTIF_SUCCESS]: handleRegisterNotifSuccess,
  [Types.REGISTER_USER_NOTIF_FAILURE]: handleRegisterNotifFailure,
  [Types.FETCH_NOTIFICATIONS_REQUEST]: handleFetchNotifRequest,
  [Types.FETCH_NOTIFICATIONS_SUCCESS]: handleFetchNotifSuccess,
  [Types.FETCH_NOTIFICATIONS_FAILURE]: handleFetchNotifFailure,
  [Types.DELETE_NOTIFICATION_REQUEST]: handleDeleteNotifRequest,
  [Types.DELETE_NOTIFICATION_SUCCESS]: handleDeleteNotifSuccess,
  [Types.DELETE_NOTIFICATION_FAILURE]: handleDeleteNotifFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
