import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  register: ['userObj']
})

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  userInfoAdded: false,
  accessToken: null,
  expiresIn: null,
  tokenType: null,
  scope: null,
  refreshToken: null
})

export const registerAccount = (state = INITIAL_STATE, action) => {
  const { data } = action.userObj
  return {
    ...state,
    userInfoAdded: true,
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    tokenType: data.tokenType,
    scope: data.scope,
    refreshToken: data.refreshToken
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER]: registerAccount
})
