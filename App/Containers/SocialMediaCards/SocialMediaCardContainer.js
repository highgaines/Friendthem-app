import React, { Component } from 'react'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity } from 'react-native'

// Components
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthStoreActions, { loginByFacebook } from '../../Redux/AuthStore'
import FBStoreActions from '../../Redux/FBStore';

// Libraries
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

// Config
import envConfig from '../../../envConfig'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'

// Styles
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

  socialPlatformUsername = (platform) => {
    const { social_profiles } = this.props.fromFriendProfile ? this.props.friendData : this.props.userInfo
    const currentPlatform = social_profiles.find(profile => profile.provider === platform)

    return currentPlatform ? currentPlatform.username : null
  }

  render() {
    const {
      platforms,
      onPressCallback,
      snapchatCallback,
      platformSynced,
      fromFriendProfile,
      fromUserProfile,
      friendPlatforms,
      platformSelected
    } = this.props
    const {
      socialMediaData,
      syncedCardColors,
      selectedSocialMedia
    } = this.state

    return (
      <ScrollView contentContainerStyle={styles.socialAccountContainer}>
      {
        Object.keys(socialMediaData).map((socialPlatform, idx) => {
          const isYoutube = socialPlatform === 'youtube'
          const currentPlatform = platformSynced(isYoutube ? 'google-oauth2' : socialPlatform)
          const isSelected = platformSelected(isYoutube ? 'google-oauth2': socialPlatform)
          const isSynced = !!currentPlatform
          const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1)
          const userName = currentPlatform ? this.socialPlatformUsername(isYoutube ? 'google-oauth2' : socialPlatform) : null
          const friendPlatfromPresent = fromFriendProfile && friendPlatforms ?
            friendPlatforms && friendPlatforms.find(socialElem => {
              if (isYoutube) {
                return socialElem.provider === 'google-oauth2'
              } else {
                return socialElem.provider === socialPlatform
              }
            }) : true

          if (friendPlatfromPresent) {
            console.log(socialPlatform, isSynced)
            return (
              <SocialMediaCard
                key={idx}
                platformName={capitalizeName(socialPlatform)}
                synced={isSynced}
                readOnly={isSynced && fromUserProfile}
                socialAuth={(!isSynced && fromFriendProfile) ?
                  () => null : this.determineSocialAuth(socialPlatform)
                }
                platformAuth={isYoutube ? 'google-oauth2' : socialPlatform}
                userName={userName}
                syncedBGColor={syncedCardColors[socialPlatform]}
                selected={isSelected}
              />
            )
          } else {
            return null
          }
        })
      }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  friendData: state.friendStore.friendData,
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
