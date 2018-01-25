import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Button, Linking , AppState, ScrollView, TouchableOpacity } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Image from 'react-native-remote-svg'
import RNYoutubeOAuth from 'react-native-youtube-oauth';

// Components
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard'
import Navbar from '../Navbar/Navbar'
import PickSocialMediaModal from '../TutorialScreens/PickSocialMediaModal'
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import PersonalInfoTab from './PersonalInfoTab'
import FriendThemModal from '../UtilityComponents/FriendThemModal'

// Redux
import AuthStoreActions, { socialMediaAuth } from '../../Redux/AuthStore'
import UserStoreActions, { getUserId, updateInfo } from '../../Redux/UserStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserProfileStyles'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'

// Env
import envConfig from '../../../envConfig'

class UserProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      socialNetworkTab: true,
      showFriendster: true,
      externalAuth: false,
      currentPlatform: null,
      appState: AppState.currentState,
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
      snapHandleModalOpen: false
    }
  }

  triggerFriendster = () => {
    const { showFriendster } = this.state
    this.setState({ showFriendster: !showFriendster })
  }

  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserId, loggedIn, getUserTokens } = this.props
    AppState.addEventListener('change', this._handleAppStateChange);

    if (apiAccessToken && loggedIn) {
      getUserId(apiAccessToken)
      getUserTokens(apiAccessToken)
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { getUserTokens, apiAccessToken } = this.props
    const { externalAuth, appState } = this.state
    const returningToApp = appState.match(/inactive|background/) && nextState.appState === 'active'

    if (externalAuth && returningToApp) {
      this.setState({externalAuth: false}, () => getUserTokens(apiAccessToken))
    }
  }

  componentDidUpdate = prevProps => {
    const { authRedirectUrl } = this.props
    const { socialMediaData, currentPlatform } = this.state

    if (authRedirectUrl && !prevProps.authRedirectUrl && currentPlatform) {
      const deepLinkBase = socialMediaData[currentPlatform.split('-')[0]].deepLinkUrl
      const deepLinkAuth = `${deepLinkBase}${authRedirectUrl.split('.com/')[1]}`

      this.setState({externalAuth: true})

      if (Linking.canOpenURL(deepLinkAuth && false)) {
        Linking.openURL(deepLinkAuth)
      } else {
        Linking.openURL(authRedirectUrl)
      }
    }
  }

  _handleAppStateChange = nextAppState => {
    this.setState({appState: nextAppState})
  }

  authenticateSocialMedia = platform => {
    const { userId, apiAccessToken } = this.props
    this.setState({currentPlatform: platform})
    this.props.socialMediaAuth(platform, userId, apiAccessToken)
  }

  socialPlatformPresent = (provider) => {
    const { platforms, userInfo } = this.props

    switch (provider) {
      case 'snapchat':
        return userInfo && userInfo.snapHandle
      case 'youtube':
        return platforms.find(platformObj => platformObj.provider === 'google-oauth2')
      default:
        return platforms.find(platformObj => platformObj.provider === provider)
    }

  }

  determineImage = () => {
    const { userInfo } = this.props

    if (userInfo.picture.data.url) {
      return {uri: `${userInfo.picture.data.url}`}
    } else {
      return Images.noPicSVG
    }
  }

  determineStyling = () => {
    const { userInfo } = this.props
    return userInfo.picture.data.url.length > 1 ? true : false
  }

  toggleSnapchatModal = () => {
    const { snapHandleModalOpen } = this.state

    this.setState({snapHandleModalOpen: !snapHandleModalOpen})
  }

  render() {
    const {
      userId,
      userInfo,
      userInterests,
      userLocation,
      navigation,
      apiAccessToken,
      getUserId,
      socialMediaAuth,
      getUserTokens,
      platforms,
      updateInfo
    } = this.props
    const { showFriendster, socialMediaData, socialNetworkTab, syncedCardColors } = this.state
    const { devGoogleBaseURL, devGoogleApiParams, devGoogleClientId } = envConfig.Development

    return (
        <View style={showFriendster ? { opacity: 0.3 } : ''}>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
          <PickSocialMediaModal
            triggerModal={this.triggerFriendster}
            showModal={showFriendster}
          />
            <View style={[styles.profileHeader, { height: 150}]}>
              <View style={styles.profHeaderTop}>
                <Image
                  style={[styles.profileImage]}
                  source={this.determineImage()} />
              </View>
              <Text style={styles.profileSubtext}>
              {`${userInfo.name}`}
              </Text>
            </View>
            <FriendThemModal
              modalVisible={this.state.snapHandleModalOpen}
              toggleSnapchatModal={this.toggleSnapchatModal}
              submitText={(inputValue) => updateInfo('snapHandle', inputValue)} />
            <View style={styles.tabSelectionContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ socialNetworkTab: true })}
                style={[styles.tabItem, socialNetworkTab ? styles.selected : null]}>
                <Text
                  style={[styles.tabText, socialNetworkTab ? styles.selectedText : null]}
                  >
                  SOCIAL NETWORKS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ socialNetworkTab: false })}
                style={[styles.tabItem, socialNetworkTab ? null : styles.selected]}>
                <Text
                  style={[styles.tabText, socialNetworkTab ? null : styles.selectedText]}
                  >
                  PERSONAL INFO
                </Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>

        {  socialNetworkTab ?  <ScrollView contentContainerStyle={styles.socialAccountContainer}>
            {
              Object.keys(socialMediaData).map((socialPlatform, idx) => {
                const isYoutube = socialPlatform === 'youtube'
                const isSnapchat = socialPlatform === 'snapchat'
                const currentPlatform = this.socialPlatformPresent(socialPlatform)
                const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1)
                const userName = currentPlatform && !isSnapchat ? currentPlatform['access_token'][socialMediaData[socialPlatform]['userNamePath']] : null
                const isSynced = !!currentPlatform

                return (
                  <SocialMediaCard
                    key={idx}
                    platformName={capitalizeName(socialPlatform)}
                    selected={isSynced}
                    socialAuth={isSnapchat ? this.toggleSnapchatModal : (platform) => this.authenticateSocialMedia(platform)}
                    platformAuth={isYoutube ? 'google-oauth2' : socialPlatform}
                    userName={userName}
                    syncedBGColor={syncedCardColors[socialPlatform]}
                  />
                )
              })
            }
          </ScrollView> :
          <ScrollView style={{ height: 366}}>
            <PersonalInfoTab />
          </ScrollView>
         }
            <View>
              <Navbar
                navbarStyle={styles.userProfNavbar}
                navigation={navigation}
                current='Profile'
                margin={0}
              />
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  userInterests: state.userStore.interests,
  userLocation: state.userStore.location,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  loggedIn: state.authStore.loggedIn,
  platforms: state.tokenStore.platforms,
  needsFetchTokens: state.tokenStore.needsFetchTokens,
  authRedirectUrl: state.tokenStore.authRedirectUrl
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      getUserId,
      socialMediaAuth,
      getUserTokens,
      updateInfo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
