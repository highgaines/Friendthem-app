import { createActions, createReducer } from 'reduxsauce'
import { fetchFromApi } from './ApiHelpers'
import Immutable from 'seamless-immutable'
import envConfig from '../../envConfig'
import Analytics from 'analytics-react-native'
const analytics = new Analytics(envConfig.Development.SegmentAPIKey)

const { Types, Creators} = createActions({
  socialMediaConnectRequest: null,
  socialMediaConnectSuccess: null,
  socialMediaConnectFailure: null,
  togglePlatform: ['platformName'],
  setManualPlatforms: ['platformArr'],
  setSuperConnectPlatforms: ['platformList'],
  logoutUser: null,
})

export const SuperConnectTypes = Types
export default Creators

/* --------- Initial State --------- */
export const INITIAL_STATE = Immutable({
  selectedSocialMedia: [],
  manualPlatforms: []
})

export const superConnectPlatform = (platformName, apiAccessToken, friendId) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${apiAccessToken}`)

  const body = {
    provider: platformName,
    user_2: friendId
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }

  return {
    types: [
      Types.SOCIAL_MEDIA_CONNECT_REQUEST,
      Types.SOCIAL_MEDIA_CONNECT_SUCCESS,
      Types.SOCIAL_MEDIA_CONNECT_FAILURE
    ],
    shouldCallApi: state => true,
    callApi: dispatch => fetchFromApi('connect/', init, dispatch)
  }
}
/* ---------- Reducers --------- */

const handleSetSelectedSocialMedia = (state, action) => {
  const { platformList } = action

  return state.set('selectedSocialMedia', Immutable(platformList));
}

const handleTogglePlatform = (state, action) => {
  const { platformName } = action
  const { selectedSocialMedia } = state
  const itemIndex = selectedSocialMedia.findIndex(socialMedia => socialMedia === platformName)

  if (itemIndex < 0) {
    return state.update('selectedSocialMedia', selectedMedia => [...selectedMedia, platformName]);
  } else {
    return state.update('selectedSocialMedia', selectedMedia => selectedMedia.slice(0, itemIndex).concat(selectedMedia.slice(itemIndex + 1)));
  }
}

const handleSocialMediaConnectRequest = (state, action) => {
  return state;
}

const handleSocialMediaConnectSuccess = (state, action) => {
  return state;
}

const handleSocialMediaConnectFailure = (state, action) => {
  return state;
}

const handleSetManualPlatforms = (state, action) => {
  return state.set('manualPlatforms', action.platformArr);
}

const handleUserLogout = (state, action) => {
  return INITIAL_STATE;
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_PLATFORM]: handleTogglePlatform,
  [Types.SET_MANUAL_PLATFORMS]: handleSetManualPlatforms,
  [Types.SET_SUPER_CONNECT_PLATFORMS]: handleSetSelectedSocialMedia,
  [Types.SOCIAL_MEDIA_CONNECT_REQUEST]: handleSocialMediaConnectRequest,
  [Types.SOCIAL_MEDIA_CONNECT_SUCCESS]: handleSocialMediaConnectSuccess,
  [Types.SOCIAL_MEDIA_CONNECT_FAILURE]: handleSocialMediaConnectFailure,
  [Types.LOGOUT_USER]: handleUserLogout,
})
