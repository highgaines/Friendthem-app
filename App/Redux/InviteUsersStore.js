import { createReducer, createActions } from 'reduxsauce';
import { fetchFromApi } from './ApiHelpers';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    sendInviteToUser: null,
    selectUser: ['user'],
    connectivityInfoRequest: null,
    connectivityInfoFailure: null,
    connectivityInfoSuccess: null,
    logoutUser: null,
})

export const InviteUsers = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userList: [
    {
      key: 1,
      name: 'Harry Potter',
      image: 'https://images.pottermore.com/bxd3o8b291gf/3SQ3X2km8wkQIsQWa02yOY/25f258f21bdbe5f552a4419bb775f4f0/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=1200',
      platforms: ['facebook', 'twitter']
    },
    {
      key: 2,
      name: "Ron Weasley",
      image: 'https://vignette.wikia.nocookie.net/erbparodies/images/a/a8/Ronweasley.jpg/revision/latest?cb=20151108172554',
      platforms: ['facebook']
    },
    {
      key: 3,
      name: "Hermoine Granger",
      image: 'https://vignette.wikia.nocookie.net/harrypotter/images/0/0a/Hermione_Granger_OOTP_promo_f_1.jpg/revision/latest?cb=20120413221757',
      platforms: ['snapchat', 'instagram']
    },
    {
      key: 4,
      name: "Draco Malfoy",
      image: 'https://vignette.wikia.nocookie.net/harrypotter/images/2/21/Dracodh.jpg/revision/latest?cb=20100925140916',
      platforms: ['instagram', 'twitter']
    },
    {
      key: 5,
      name: "Neville Longbottom",
      image: "https://vignette.wikia.nocookie.net/harrypotter/images/2/20/NevilleHBP.jpg/revision/latest?cb=20141122220929",
      platforms: ['facebook', 'instagram']
    },
    {
      key: 6,
      name: "Cedric Diggory",
      image: 'https://vignette.wikia.nocookie.net/harrypotter/images/2/23/CedricDiggoryProfile.png/revision/latest?cb=20161123045136',
      platforms: ['twitter', 'snapchat']
    },
    {
      key: 7,
      name: "Luna Lovegood",
      image: "https://images.pottermore.com/bxd3o8b291gf/Mam68Vfou2OO6kqEcyW8W/a9abc28e1e15bdd7d57f6257f3fed897/LunaLovegood_WB_F6_LunaLovegoodInQuibblerSpecsOnHogwartsExpress_Still_080615_Port.jpg?w=1200",
      platforms: ['snapchat', 'instagram']
    }
  ],
  selectedUser: '',
  connectivityData: []
})

/* ------------- Actions ------------- */

export const sendInvitationToUser = (name) => {
  return { type: Types.SEND_INVITE_TO_USER, payload: { name } }
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

const handleSendInvite = (state, action) => {
  const { name } = action.payload
  const filteredData = state.userList.filter( user => user.name === name)

  return state.merge({ userList: filteredData})
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
  [Types.SEND_INVITE_TO_USER]: handleSendInvite,
  [Types.SELECT_USER]: handleSelectUser,
  [Types.CONNECTIVITY_INFO_REQUEST]: handleConnectivityRequest,
  [Types.CONNECTIVITY_INFO_SUCCESS]: handleConnectivitySuccess,
  [Types.CONNECTIVITY_INFO_FAILURE]: handleConnectivityFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
