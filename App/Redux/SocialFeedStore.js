import { createReducer, createActions } from 'reduxsauce';
import { fetchFromApi } from './ApiHelpers';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

})

export const SocialFeed = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  twitterFeed: {},
  instagramFeed: {},
  facebookFeed: {},
  fetching: false
})

/* ------------- Actions ------------- */



/* ------------- Reducers ------------- */



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {


})
