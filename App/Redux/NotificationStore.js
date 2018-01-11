import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-native';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deleteRow: ['rowMap', 'rowKey']
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// notification dummy data
export const INITIAL_STATE = Immutable({
  notifications: [
    {
      key: 1,
      name: "Mickey Mouse",
      img: 'https://www.disneyclips.com/imagesnewb/images/mickey_smiling2.gif',
      message: "wants to connect on facebook"
    },
    {
      key: 2,
      name: "Donald Duck",
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Donald_Duck.svg/618px-Donald_Duck.svg.png',
      message: "just joined Friendthem"
     },
    {
      key: 3, name: "Goofy", img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Goofy.svg/1200px-Goofy.svg.png',
      message: "wants to connect on facebook"
    },
    {
      key: 4,
      name: "Sora",
      img: 'https://vignette.wikia.nocookie.net/kingdomhearts/images/5/59/Sora_%28Art%29_KH.png/revision/latest/scale-to-width-down/180?cb=20121114141242',
      message: "wants to follow you"
    }
  ],
  fetching: false
})

/* ------------- Selectors ------------- */


/* ------------- Reducers ------------- */

const DELETE_ROW = 'DELETE_ROW'

export const deleteRowAction = (rowKey) => {
  return { type: Types.DELETE_ROW, payload: { rowKey } }
}

const handleDeleteRowSuccess = (state = INITIAL_STATE, action)  => {

  const { rowKey } = action.payload
  const newData = state.notifications.filter(item => item.key !== rowKey)

  return state.merge({ notifications: newData })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_ROW]: handleDeleteRowSuccess
})
