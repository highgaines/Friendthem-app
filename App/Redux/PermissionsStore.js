import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setGeoPermission: ['permission'],
  setNotifPermission: ['permission']
})

export const PermissionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  geolocation: null,
  notifications: null
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

/* ----------------- Reducers ----------------- */

const handleSetGeolocation = (state = INITIAL_STATE, action) => {
  const { permission } = action.payload
  return state.merge({ geolocation: permission })
}

const handleSetNotification = (state = INITIAL_STATE, action) => {
  const { permission } = action.payload
  return state.merge({ notifications: permission })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_GEO_PERMISSION]: handleSetGeolocation,
  [Types.SET_NOTIF_PERMISSION]: handleSetNotification
})
