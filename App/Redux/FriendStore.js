import { createReducer, createActions } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
const fbDeepLinkURL = 'fb://profile/'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setFriendInfo: ['friendInfo'],
  connectivityInfoSuccess: null,
  checkFriendConnectionRequest: null,
  checkFriendConnectionSuccess: null,
  checkFriendConnectionFailure: null,
  logoutUser: null,
})

export const FriendTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  friendData: {},
  users: [],
  connection: [],
  fetching: false
})

/* ------------- Actions ------------- */

export const checkFriendConnection = (accessToken, friendUserId) => {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${accessToken}`)
    headers.append("Content-Type", "application/json")

    const init = {
      method: "GET",
      headers
    }

    return {
      types: [
        Types.CHECK_FRIEND_CONNECTION_REQUEST,
        Types.CHECK_FRIEND_CONNECTION_SUCCESS,
        Types.CHECK_FRIEND_CONNECTION_FAILURE
      ],
      shouldCallApi: state =>  true,
      callApi: dispatch => fetchFromApi(`connect/${friendUserId}/`, init, dispatch)
    }
}

/* ------------- Reducers ------------- */
const handleFriendInfo = (state = INITIAL_STATE, action) => {
  return state.set('friendData', action.friendInfo);
}

const handleConnectivitySuccess = (state, action) => {
  const { data } = action

  return state.set('users', data);
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE;
}

const handleFriendConnectionRequest = (state, action) => {
  return state.set("fetching", true)
}

const handleFriendConnectionSuccess = (state, action) => {
  return state.merge({
    connection: action.response.data,
    fetching: false
  })
}

const handleFriendConnectionFailure = (state, action) => {
  return state.merge({
    connection: Immutable([]),
    fetching: false
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FRIEND_INFO]: handleFriendInfo,
  [Types.CONNECTIVITY_INFO_SUCCESS]: handleConnectivitySuccess,
  [Types.LOGOUT_USER]: handleUserLogout,
  [Types.CHECK_FRIEND_CONNECTION_REQUEST]: handleFriendConnectionRequest,
  [Types.CHECK_FRIEND_CONNECTION_SUCCESS]: handleFriendConnectionSuccess,
  [Types.CHECK_FRIEND_CONNECTION_FAILURE]: handleFriendConnectionFailure
})
