import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
const fbDeepLinkURL = 'fb://profile/'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setFriendInfo: ['friendInfo'],
  connectivityInfoSuccess: null
})

export const FriendTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  friendData: {},
  users: []
})

/* ------------- Reducers ------------- */
const handleFriendInfo = (state = INITIAL_STATE, action) => {
  return { ...state, friendData: action.friendInfo }
}

const handleConnectivitySuccess = (state, action) => {
  const { data } = action
  const { users } = state
  return {
    ...state,
    users: [...users, ...data]
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FRIEND_INFO]: handleFriendInfo,
  [Types.CONNECTIVITY_INFO_SUCCESS]: handleConnectivitySuccess
})
