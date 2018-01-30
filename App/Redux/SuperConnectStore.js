import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'

const { Types, Creators} = createActions({
  setSuperConnectPlatforms: ['platformList']
})

export const SuperConnectTypes = Types
export default Creators

/* --------- Initial State --------- */
export const INITIAL_STATE = Immutable({
  selectedSocialMedia: []
})

/* ---------- Reducers --------- */

const handleSetSelectedSocialMedia = (state, action) => {
  const { platformList } = action

  return {
    ...state,
    selectedSocialMedia: platformList
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SUPER_CONNECT_PLATFORMS]: handleSetSelectedSocialMedia
})
