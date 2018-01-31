import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity } from 'react-native'
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'
import envConfig from '../../../envConfig'
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'
import AuthStoreActions, { loginByFacebook } from '../../Redux/AuthStore'
import FBStoreActions from '../../Redux/FBStore';
import styles from '../Styles/UserProfileStyles'

class SocialMediaCardContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPlatform: '',
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS
    }
  }

  componentDidUpdate = (prevProps) => {
    const { fbAuthToken, loginByFacebook, accessToken } = this.props

    if (fbAuthToken && !prevProps.fbAuthToken) {
      loginByFacebook({
        client_id: envConfig.Development.devClientId,
        client_secret: envConfig.Development.devClientSecret,
        grant_type: 'convert_token',
        backend: 'facebook',
        token: fbAuthToken
      }, accessToken)
    }
  }

  handleFBLogin = () => {
    const { loginComplete } = this.props
    const userPermissions = ["public_profile", "user_friends", "email"]

    LoginManager.logInWithReadPermissions(userPermissions).then((result) => {
      if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            loginComplete(data.accessToken)
          })
        }
      },
      (error) =>  {
        console.log('Login fail with error: ' + error)
      }
    )
  }

  determineSocialAuth = (platformName) => {
    const { onPressCallback, snapchatCallback,fromFriendProfile } = this.props
    switch (platformName) {
      case 'snapchat':
        return fromFriendProfile ? onPressCallback : snapchatCallback
      case 'facebook':
        return fromFriendProfile ? onPressCallback : this.handleFBLogin
      default:
        return onPressCallback
    }
  }

  render() {
    const {
      platforms,
      onPressCallback,
      snapchatCallback,
      platformSelected,
      fromFriendProfile
    } = this.props
    const { socialMediaData, syncedCardColors, selectedSocialMedia } = this.state

    return (
      <ScrollView contentContainerStyle={styles.socialAccountContainer}>
      {
        Object.keys(socialMediaData).map((socialPlatform, idx) => {
          const isYoutube = socialPlatform === 'youtube'
          const isSnapchat = socialPlatform === 'snapchat'
          const isFacebook = socialPlatform === 'facebook'
          const currentPlatform = platformSelected(isYoutube ? 'google-oauth2' : socialPlatform)
          const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1)
          const userName = currentPlatform && false ? currentPlatform['access_token'][socialMediaData[socialPlatform]['userNamePath']] : null
          const isSynced = !!currentPlatform

          return (
            <SocialMediaCard
              key={idx}
              platformName={capitalizeName(socialPlatform)}
              selected={isSynced}
              socialAuth={this.determineSocialAuth(socialPlatform)}
              platformAuth={isYoutube ? 'google-oauth2' : socialPlatform}
              userName={userName}
              syncedBGColor={syncedCardColors[socialPlatform]}
            />
          )
        })
      }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  platforms: state.tokenStore.platforms,
  fbAuthToken: state.fbStore.fbAccessToken,
  accessToken: state.authStore.accessToken,
})

const mapDispatchToProps = dispatch => {
  const { loginComplete, logoutComplete } = FBStoreActions
  return {
    ...bindActionCreators({
      loginByFacebook,
      loginComplete,
      logoutComplete
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaCardContainer)
