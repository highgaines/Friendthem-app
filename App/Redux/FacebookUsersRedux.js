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
      'image': 'https://www.thesun.co.uk/wp-content/uploads/2017/06/nintchdbpict000286057311-e1496752083398.jpg?strip=all&w=936',
      'name': 'Floyd Mayweather',
      fbUrl: fbDeepLinkURL,
      interests: ['Boxer', 'Entrepreneur', 'Father']
    },
    {
      'image': 'https://cdn.images.express.co.uk/img/dynamic/167/590x/secondary/Conor-McGregor-765124.jpg',
      'name': 'Conor Mcgregor',
      'fbUrl': fbDeepLinkURL + '494191297315841',
      interests: ['MMA Fighter', 'Entrepreneur', 'Father']
    },
    {
      'image': 'https://usatmmajunkie.files.wordpress.com/2017/05/manny-pacquiao.jpg?w=640',
      'name': 'Manny Pacquaio',
      fbUrl: fbDeepLinkURL,
      interests: ['Boxer', 'Entrepreneur', 'Father']
    },
    {
      'image': 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/21316507_10155006784517709_7125993525464181821_o.jpg?oh=1240661516ae37ca2606af692fe8f87a&oe=5ABE7DFA',
      'name': 'Jimmy Zhang',
      fbUrl: fbDeepLinkURL + '502562708',
      interests: ['Coder', 'Gamer', 'Crypto Enthusiast']
    },
    {
      'image': 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/24301357_10101682515692025_688989114175452534_n.jpg?oh=ce183e657d63e2afbc440c5f19d59a41&oe=5AB8A292',
      'name': 'Naz Khan',
      fbUrl: fbDeepLinkURL + '16410544',
      id: '16410544',
      interests: ['Coder', 'Gamer', 'Crypto Enthusiast']
    },
    {
      'image': 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/14051825_10153661573696714_9109463151671898540_n.jpg?oh=9d98235bb9a05aa1d64201d6355d0a82&oe=5ACEB63F',
      'name': 'Eoghan Leddy',
      fbUrl: fbDeepLinkURL + '10154996425606714',
      id: '10154996425606714',
      interests: ['Coder', 'Gamer', 'Biker']
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
