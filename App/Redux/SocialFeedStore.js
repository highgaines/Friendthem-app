import { createReducer, createActions } from 'reduxsauce';
import { fetchFromApi } from './ApiHelpers';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchFeedDataRequest: null,
  fetchFeedDataSuccess: null,
  fetchFeedDataFailure: null
})

export const SocialFeed = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  instagramFeed: [
    {
    	img_url: "https://cdn-images-1.medium.com/max/1200/*jB76MLZjiNhGSQQvxm7LSQ.gif",
    	num_likes: 38,
    	description: 'Hello world!!',
    	date_posted: 'Monday, February 5th 8:33PM',
    	type: 'photo',
    	provider: 'instagram'
    },
    {
    	img_url: 'http://www.petsworld.in/blog/wp-content/uploads/2014/09/cute-kittens.jpg',
    	num_likes: 44,
    	description: 'I love cats!!!',
    	date_posted: 'Tuesday, February 6th 12:01 PM',
    	type: 'photo',
    	provider: 'instagram'
    }
  ],
  facebookFeed: [],
  fetching: false
})

/* ------------- Actions ------------- */

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
    callApi: dispatch => fetchFromApi('profile/me', init, dispatch)
  }
}

/* ------------- Reducers ------------- */

const handleFeedDataRequest = (state, action) => {
  return { ...state, fetching: true }
}

const handleFeedDataSuccess = (state, action) => {
  return {
    ...state,
    fetching: false,
    [action.platform]: action.data
  }
}

const handleFeedDataFailure = (state, action) => {
  return {
    ...state,
    fetching: false
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_FEED_DATA_REQUEST]: handleFeedDataRequest,
  [Types.FETCH_FEED_DATA_SUCCESS]: handleFeedDataSuccess,
  [Types.FETCH_FEED_DATA_FAILURE]: handleFeedDataFailure
})
