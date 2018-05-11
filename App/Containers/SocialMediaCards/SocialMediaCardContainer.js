import React, { Component } from 'react'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'

// Components
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthStoreActions, { loginByFacebook } from '../../Redux/AuthStore'
import UserStoreActions, { getUserInfo } from '../../Redux/UserStore'
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
    const { loginComplete, getUserInfo, accessToken } = this.props
    const userPermissions = ["public_profile", "user_friends", "email", "user_photos", "user_posts"]

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
    const updatedPlatform = platform === 'linkedin' ? 'linkedin-oauth2' : platform
    const currentPlatform = social_profiles ? social_profiles.find(profile => profile.provider === updatedPlatform) : null

    return currentPlatform ? currentPlatform.username : null
  }

  checkConnection = platform => {
    const { connection } = this.props
    return connection ? connection.find( connObj => connObj.provider === platform) : null
  }

  render() {
    const {
      fromFriendProfile,
      fromUserProfile,
      friendPlatforms,
      fetching,
      friendData,
      isFriendthem,
      onPressCallback,
      platforms,
      platformSynced,
      platformSelected,
      snapchatCallback,
      toggleBanner,
    } = this.props
    const {
      socialMediaData,
      syncedCardColors,
      selectedSocialMedia
    } = this.state

    if (fetching) {
      return (
        <View style={{ height: '30%', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return (
      <View style={styles.socialCardScrollContainer}>
        <ScrollView
          contentContainerStyle={styles.socialAccountContainer}>
        {
          Object.keys(socialMediaData).map((socialPlatform, idx) => {
            const isYoutube = socialPlatform === 'youtube'
            const isFacebook = socialPlatform === 'facebook'
            const currentPlatform = platformSynced(isYoutube ? 'google-oauth2' : socialPlatform)
            const isSelected = platformSelected(isYoutube ? 'google-oauth2': socialPlatform)
            const isSynced = !!currentPlatform
            const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1)
            const friendPlatformPresent = fromFriendProfile && friendPlatforms ?
            friendPlatforms && friendPlatforms.find(socialElem => {
              if (isYoutube) {
                return socialElem.provider === 'google-oauth2'
              } else if (socialPlatform === 'linkedin') {
                return socialElem.provider === 'linkedin-oauth2'
              } else {
                return socialElem.provider === socialPlatform
              }
            }) : true
            const userName = currentPlatform || !fromFriendProfile ?
              this.socialPlatformUsername(isYoutube ? 'google-oauth2' : socialPlatform)
              :
              friendPlatformPresent ? friendPlatformPresent.username : null
            const isClickable = currentPlatform && fromFriendProfile && friendPlatformPresent && isSynced && isFriendthem && !isFacebook

            if (friendPlatformPresent) {
              return (
                <SocialMediaCard
                  key={idx}
                  fromUserProfile={fromUserProfile}
                  platformName={capitalizeName(socialPlatform)}
                  toggleBanner={() => toggleBanner(friendData.first_name, capitalizeName(socialPlatform), 3000)}
                  synced={isSynced}
                  connectedWithVisitor={isSynced && fromFriendProfile ? this.checkConnection(socialPlatform) : null}
                  readOnly={isSynced && fromUserProfile}
                  socialAuth={isClickable ? () => onPressCallback({provider: isYoutube ? 'google-oauth2' : socialPlatform}) :
                    ((!isSynced && fromFriendProfile) && (!fromUserProfile && socialPlatform === 'snapchat')) ?
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
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  fetching: state.authStore.fetching,
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
      logoutComplete,
      getUserInfo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaCardContainer)
