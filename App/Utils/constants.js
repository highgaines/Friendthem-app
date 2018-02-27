/************************ IMPORTS ************************/

import { Images } from '../Themes';
import Permissions from 'react-native-permissions'
import { NavigationActions } from 'react-navigation'

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
    superConnectDeepLink: 'fb://profile/'
  },
  instagram: {
    deepLinkUrl: 'instagram://',
    superConnectDeepLink: 'instagram://user?username='
  },
  twitter: {
    deepLinkUrl: 'twitter://',
    userNamePath: 'screen_name'
  },
  youtube: {
    deepLinkUrl: 'youtube://'
  },
  snapchat: {
    deepLinkUrl: 'snapchat://'
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

/************************ FUNCTIONS ************************/

export const determineImage = (accountData) => {
  if (accountData.picture) {
    return {uri: `${accountData.picture}`}
  } else {
    return Images.noPicSVG
  }
}
