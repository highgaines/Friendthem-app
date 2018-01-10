import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationsRequest: null,
  notificationsSuccess: null,
  notificationsFailure: null
})

export const NotificationsTypes = Types
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

export const request = (state, action) => state.merge({ fetching: true })

export const success = (state, action) => {
  const { notifications } = action
  return state.merge({ fetching: false, notifications: notifications })
}

export const failure = (state) => state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATIONS_REQUEST]: request,
  [Types.NOTIFICATIONS_SUCCESS]: success,
  [Types.NOTIFICATIONS_FAILURE]: failure
})
