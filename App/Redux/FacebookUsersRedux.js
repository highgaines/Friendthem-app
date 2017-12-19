import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
const fbDeepLinkURL = 'fb://profile/'
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
      'image': '',
      'name': 'Floyd Mayweather',
      fbUrl: fbDeepLinkURL
    },
    {
      'image': '',
      'name': 'Conor Mcgregor',
      'fbUrl': fbDeepLinkURL + '494191297315841'
    },
    {
      'image': '',
      'name': 'Manny Pacquaio',
      fbUrl: fbDeepLinkURL
    },
    {
      'image': '',
      'name': 'Manny Pacquaio',
      fbUrl: fbDeepLinkURL
    },
    {
      'image': '',
      'name': 'Jimmy Zhang',
      fbUrl: fbDeepLinkURL + '502562708'
    },
    {
      'image': 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/24301357_10101682515692025_688989114175452534_n.jpg?oh=ce183e657d63e2afbc440c5f19d59a41&oe=5AB8A292',
      'name': 'Naz Khan',
      fbUrl: fbDeepLinkURL + '16410544',
      id: '16410544'
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
