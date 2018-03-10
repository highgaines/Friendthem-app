import { createReducer, createActions } from 'reduxsauce';
import { fetchFromApi } from './ApiHelpers';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchFeedDataRequest: null,
  fetchFeedDataSuccess: null,
  fetchFeedDataFailure: null,
  logoutUser: null,
})

export const SocialFeed = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  feed: {},
  fetching: false
})

/* ------------- Actions ------------- */

// route will be adjusted after PR for endpoints is up
export const fetchFeed = (accessToken, userId, platform) => {

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  headers.append('Content-Type', 'application/json')

  const init = {
    method: 'GET',
    headers
  }

  return {
    types: [
      Types.FETCH_FEED_DATA_REQUEST,
      Types.FETCH_FEED_DATA_SUCCESS,
      Types.FETCH_FEED_DATA_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi(`feed/${userId}/${platform}/`, init, dispatch)
  }
}

/* ------------- Reducers ------------- */

const handleFeedDataRequest = (state, action) => {
  return state.set('fetching', true);
}

const handleFeedDataSuccess = (state, action) => {
  const feedData = action.response.data.data
  const provider = feedData.length ? action.response.data.data[0].provider : ''
  const userId = action.response.data.user_id

  return state.set('fetching', false).update('feed', (oldFeed) => oldFeed.setIn([userId, provider], feedData))
}

const handleFeedDataFailure = (state, action) => {
  return state.set('fetching', false);
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_FEED_DATA_REQUEST]: handleFeedDataRequest,
  [Types.FETCH_FEED_DATA_SUCCESS]: handleFeedDataSuccess,
  [Types.FETCH_FEED_DATA_FAILURE]: handleFeedDataFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
