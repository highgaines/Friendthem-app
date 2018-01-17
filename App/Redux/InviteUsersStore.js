import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    sendInviteToUser: null
})

export const InvitationTypes = Types
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
  ]
})

/* ------------- Actions ------------- */

export const sendInvitationToUser = (name) => {
  return { type: Types.sendInviteToUser, payload: { name } }
}

/* ------------- Reducers ------------- */

const handleSendInvite = (state, action) => {

  const { name } = action.payload
  const filteredData = state.userList.filter( user => user.name === name)

  return state.merge({ userList: filteredData})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_INVITE_TO_USER]: handleSendInvite
})
