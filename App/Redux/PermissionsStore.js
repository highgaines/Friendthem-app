import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setGeoPermission: ['permission'],
  setNotifPermission: ['permission'],
  setNativeContactsPermission: ['permission'],
  grantLocationPermission: ['response'],
  grantNotificationPermission: ['response'],
  setLocationInterval: null,
  logoutUser: null
})

export const PermissionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  nativeGeolocation: false,
  nativeNotifications: false,
  nativeContactsPermission: false,
  locationPermissionsGranted: false,
  notificationPermissionsGranted: false,
  locationIntervalRunning: false
})

/* ----------------- Actions ------------------ */

export const setGeolocationPermission = permission => {
  // api action
  return { type: Types.SET_GEO_PERMISSION, payload: { permission }}
}

export const setNotifPermission = permission => {
  // api action
  return { type: Types.SET_NOTIF_PERMISSION, payload: { permission }}
}

export const setNativeContactsPermission = permission => {
  return { type: Types.SET_NATIVE_CONTACTS_PERMISSION, payload: { permission }}
}
/* ----------------- Reducers ----------------- */

const handleSetNativeGeolocation = (state = INITIAL_STATE, action) => {
  return state.merge({ nativeGeolocation: permission })
}

const handleSetNativeNotification = (state = INITIAL_STATE, action) => {
  const { permission } = action
  return state.merge({ nativeNotifications: permission })
}

const handleSetNativeContactsPermission = (state = INITIAL_STATE, action) => {
  const { permission } = action
  return state.merge({ nativeContactsPermission: permission})
}

const handleLocationPermissions = (state, action) => {
  return {
    ...state,
    locationPermissionsGranted: true
  }
}

const handleNotificationPermissions = (state, action) => {
  return {
    ...state,
    notificationPermissionsGranted: true
  }
}

const setLocationInterval = (state, action) => {
  return {
    ...state,
    locationIntervalRunning: true
  }
}

const removeLocationInterval = (state, action) => {
  return INITIAL_STATE
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT_USER]: removeLocationInterval,
  [Types.SET_LOCATION_INTERVAL]: setLocationInterval,
  [Types.SET_GEO_PERMISSION]: handleSetNativeGeolocation,
  [Types.SET_NOTIF_PERMISSION]: handleSetNativeNotification,
  [Types.SET_NATIVE_CONTACTS_PERMISSION]: handleSetNativeContactsPermission,
  [Types.GRANT_LOCATION_PERMISSION]: handleLocationPermissions,
  [Types.GRANT_NOTIFICATION_PERMISSION]: handleNotificationPermissions
})
