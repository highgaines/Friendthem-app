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
  users: [
    {
      'picture': 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/21316507_10155006784517709_7125993525464181821_o.jpg?oh=1240661516ae37ca2606af692fe8f87a&oe=5ABE7DFA',
      'first_name': 'Jimmy',
      'last_name': 'Zhang',
      fbUrl: fbDeepLinkURL + '502562708',
      hobbies: ['Coder', 'Gamer', 'Crypto Enthusiast'],
      'location': 'New York'
    },
    {
      'picture': 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/24301357_10101682515692025_688989114175452534_n.jpg?oh=ce183e657d63e2afbc440c5f19d59a41&oe=5AB8A292',
      'first_name': 'Naz',
      'last_name': 'Khan',
      fbUrl: fbDeepLinkURL + '16410544',
      id: '16410544',
      hobbies: ['Coder', 'Gamer', 'Crypto Enthusiast'],
      'location': 'New York'
    }
  ]
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
