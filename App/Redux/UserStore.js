import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fbUserInfo: ['userInfo']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userFbData: {
    name: '',
    picture: { data: {url: 'empty string'} }
  }
})

/* ------------- Reducers ------------- */
const handleFbUserInfoSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, userFbData: action.userInfo }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FB_USER_INFO]: handleFbUserInfoSuccess
})
