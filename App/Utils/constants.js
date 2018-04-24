/************************ IMPORTS ************************/

import { Images } from '../Themes';
import Permissions from 'react-native-permissions'
import { NavigationActions } from 'react-navigation'
import { Platform, Dimensions } from 'react-native'

/************************ PLATFORM ************************/
export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

const { height, width } = Dimensions.get('window')

export const isIpad = isIOS && (height/width < 1.6)

/************************ DATA ************************/

export const SYNCED_CARD_COLORS = {
  facebook: '#3b5997',
  twitter: '#28a9e0',
  instagram: '#9E2BB0',
  snapchat: '#feec01',
  youtube:  '#ff0000'
}

export const SOCIAL_MEDIA_DATA = {
  facebook: {
    deepLinkUrl: 'fb://',
    androidDeepLinkUrl: 'intent://#Intent;package=com.facebook.katana;scheme=fb://profile/;end',
    superConnectDeepLink: 'fb://profile/',
    androidConnectDeepLink: (userId) => `fb://page/${userId}?referrer=app_link;end`
  },
  instagram: {
    deepLinkUrl: 'instagram://',
    androidDeepLinkUrl: 'intent://instagram.com/_u//#Intent;package=com.instagram.android;scheme=https;end',
    superConnectDeepLink: 'instagram://user?username=',
    androidConnectDeepLink: (userName) => `intent://instagram.com/_u/${userName}/#Intent;package=com.instagram.android;scheme=https;end`

  },
  twitter: {
    deepLinkUrl: 'twitter://',
    androidDeepLinkUrl: 'intent://twitter.com/oauth/authenticate#Intent;package=com.twitter.android;scheme=https;end?',
    userNamePath: 'screen_name'
  },
  youtube: {
    deepLinkUrl: 'youtube://',
    androidDeepLinkUrl: 'www.youtube.com'
  },
  snapchat: {
    deepLinkUrl: 'snapchat://',
    androidDeepLinkUrl: 'snapchat://',
    superConnectDeepLink: 'snapchat://add/'
  }
}

export const MANUAL_CONNECT_PLATFORMS = [
  'facebook',
  'snapchat',
  'instagram'
]

export const NAVBAR_RENDER_OK = [
  'NearbyUsersScreen',
  'UserProfileScreen',
  'FriendProfileScreen',
  'NotificationsScreen',
  'SettingsScreen',
  'InviteUsers'
]

export const IOS_PERMISSIONS = [
  'notification',
  'location',
  'contacts'
]

export const ANDROID_PERMISSIONS = [
  'location',
  'contacts'
]

/************************ FUNCTIONS ************************/

export const determineImage = (accountData) => {
  if (accountData.picture) {
    return {uri: `${accountData.picture}`}
  } else {
    return Images.noPicSVG
  }
}
