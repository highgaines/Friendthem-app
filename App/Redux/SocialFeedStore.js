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
    	num_likes: 38,
    	description: 'Hello world!!',
    	date_posted: 'February 5th at 8:33PM',
    	type: 'photo',
    	provider: 'instagram',
      handle: 'jimzhang93'
    },
    {
    	img_url: 'http://www.petsworld.in/blog/wp-content/uploads/2014/09/cute-kittens.jpg',
    	num_likes: 44,
    	description: 'I love cats!!!',
    	date_posted: 'February 6th at 12:01PM',
    	type: 'photo',
    	provider: 'instagram',
      handle: 'jimzhang93'
    }
  ],
  facebookFeed: [
    {
      name: 'Jimmy Zhang',
    	img_url: '',
    	num_likes: 3,
    	description: 'Star Wars!',
    	date_posted: 'February 5th 9:43PM',
    	type: 'photo',
    	provider: 'facebook'
    },
    {
      name: 'Jimmy Zhang',
    	img_url: '',
    	num_likes: 9,
    	description: 'Crypto is trading sideways! Oh no!',
    	date_posted: 'February 4th at 11:18PM',
    	type: 'status',
    	provider: 'facebook'
    }
  ],
  fetching: false
})

/* ------------- Actions ------------- */

// route will be adjusted after PR for endpoints is up
export const fetchFeed = (accessToken, userId, platform) => {
  console.log(accessToken, userId, platform)
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
    callApi: dispatch => fetchFromApi(`feed/${userId}/`, init, dispatch)
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
