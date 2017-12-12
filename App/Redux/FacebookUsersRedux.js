import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usersRequest: ['users'],
  usersSuccess: ['users'],
  usersFailure: null
})

export const FacebookUsersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  users: [
    {
      'image': require('../Images/floyd.jpg'),
      'name': 'Floyd Mayweather'
    },
    {
      'image': require('../Images/conor.png'),
      'name': 'Conor Mcgregor'
    },
    {
      'image': require('../Images/pacman.jpg'),
      'name': 'Manny Pacquaio'
    }
  ],
  'fetching': false
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectUsers: state => state.facebook.users
}

/* ------------- Reducers ------------- */

// request
export const request = (state, action) =>
  state.merge({ fetching: true })

// successful
export const success = (state, action) => {
  const { users } = action
  return state.merge({ fetching: false, users: users })
}

// failed
export const failure = (state) =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USERS_REQUEST]: request,
  [Types.USERS_SUCCESS]: success,
  [Types.USERS_FAILURE]: failure
})
