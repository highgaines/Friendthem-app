import { createReducer, createActions } from 'reduxsauce';
import { fetchFromApi } from './ApiHelpers';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    selectUser: ['user'],
    storeContactInfo: null,
    connectivityInfoRequest: null,
    connectivityInfoFailure: null,
    connectivityInfoSuccess: null,
    logoutUser: null,
})

export const InviteUsers = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  contactList: [],
  selectedUser: '',
  connectivityData: []
})

/* ------------- Actions ------------- */

export const storeContactInfo = data => {
  return { type: Types.STORE_CONTACT_INFO, payload: { data } }
}

export const selectUser = (user) => {
  return { type: Types.SELECT_USER, payload: { user } }
}

export const fetchConnectivityData = (accessToken) => {

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${accessToken}`)

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.CONNECTIVITY_INFO_REQUEST,
      Types.CONNECTIVITY_INFO_SUCCESS,
      Types.CONNECTIVITY_INFO_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('nearby_users/', init, dispatch)
  }
}


/* ------------- Reducers ------------- */

const handleStoreContactInfo = (state, action) => {
  const { data } = action.payload
  return state.merge({ contactList: data })
}

const handleSelectUser = (state, action) => {
  const { user } = action.payload
  return state.merge({ selectedUser: user})
}

// Connectivity Reducers

const handleConnectivityRequest = (state, action) => {
  return state.merge({ fetchingData: true })
}

const handleConnectivityFailure = (state, action) => {
  return state.merge({ fetchingData: false})
}

const handleConnectivitySuccess = (state, action) => {
  const { data } = action

  return state.merge({ connectivityData: data, fetchingData: false })
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_CONTACT_INFO]: handleStoreContactInfo,
  [Types.SELECT_USER]: handleSelectUser,
  [Types.CONNECTIVITY_INFO_REQUEST]: handleConnectivityRequest,
  [Types.CONNECTIVITY_INFO_SUCCESS]: handleConnectivitySuccess,
  [Types.CONNECTIVITY_INFO_FAILURE]: handleConnectivityFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
