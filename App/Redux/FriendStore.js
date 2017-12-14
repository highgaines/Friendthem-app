import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setFriendInfo: ['friendInfo']
})

export const FriendTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  friendData: {}
})

/* ------------- Reducers ------------- */
const handleFriendInfo = (state = INITIAL_STATE, action) => {
  return { ...state, friendData: action.friendInfo }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FRIEND_INFO]: handleFriendInfo
})
