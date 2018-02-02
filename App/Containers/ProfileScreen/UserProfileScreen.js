import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Button, Linking , AppState, ScrollView, TouchableOpacity } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Image from 'react-native-remote-svg'
import RNYoutubeOAuth from 'react-native-youtube-oauth';
import TimerMixin from 'react-timer-mixin'

// Components
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer'
import Navbar from '../Navbar/Navbar'
import PickSocialMediaModal from '../TutorialScreens/PickSocialMediaModal'
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import PersonalInfoTab from './PersonalInfoTab'
import FriendThemModal from '../UtilityComponents/FriendThemModal'

// Redux
import UserStoreActions, { getUserId, updateInfo, updateSnapInfo } from '../../Redux/UserStore'
import AuthStoreActions, { socialMediaAuth } from '../../Redux/AuthStore'
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
      externalAuth: false,
      showFriendster: false,
      currentPlatform: null,
      socialNetworkTab: true,
      snapHandleModalOpen: false,
      appState: AppState.currentState,
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
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
    this.setState({ showFriendster: false })
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount = () => {
    setTimeout(() => this.triggerFriendster(), 2200)
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
      //const deepLinkBase = socialMediaData[currentPlatform.split('-')[0]].deepLinkUrl
      //const deepLinkAuth = `${deepLinkBase}${authRedirectUrl.split('.com/')[1]}`

      this.setState({externalAuth: true})

      if (false && Linking.canOpenURL(deepLinkAuth)) {
        Linking.openURL(`${deepLinkAuth}`)
      } else {
        Linking.openURL(`${authRedirectUrl}`)
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
    console.log(userInfo)
    switch (provider) {
      case 'snapchat':
        return userInfo.social_profiles.filter( profile => profile.provider === 'snapchat').length
      case 'youtube':
        return platforms.find(platformObj => platformObj.provider === 'google-oauth2')
      default:
        return platforms.find(platformObj => platformObj.provider === provider)
    }
  }

  determineImage = () => {
    const { userInfo } = this.props

    if (userInfo.picture) {
      return {uri: `${userInfo.picture}`}
    } else {
      return Images.noPicSVG
    }
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
      getUserTokens,
      platforms,
      updateInfo
    } = this.props
    const { showFriendster, socialMediaData, socialNetworkTab, syncedCardColors } = this.state
    const { devGoogleBaseURL, devGoogleApiParams, devGoogleClientId } = envConfig.Development

    return (
        <View>
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
              submitText={(inputValue, apiAccessToken) => updateSnapInfo('snapchat', inputValue, apiAccessToken)} />
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

        {  socialNetworkTab ?
            <SocialMediaCardContainer
              fromFriendProfile={false}
              platformSelected={(platform) => false}
              snapchatCallback={this.toggleSnapchatModal}
              onPressCallback={(platform) => this.authenticateSocialMedia(platform)}
              platformSynced={((socialMedia) => this.socialPlatformPresent(socialMedia))}
            />
          :
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
      getUserTokens,
      updateInfo,
      updateSnapInfo,
      socialMediaAuth,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
