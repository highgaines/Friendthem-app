import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, Image, View, Button, Linking , AppState, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

// Libraries
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard'
import Navbar from '../Navbar/Navbar'
import PickSocialMediaModal from '../TutorialScreens/PickSocialMediaModal'
import AuthStoreActions, { socialMediaAuth } from '../../Redux/AuthStore'
import UserStoreActions, { getUserId } from '../../Redux/UserStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'

// Styles
import styles from '../Styles/UserProfileStyles'
import { SOCIAL_MEDIA_DATA } from '../../Utils/constants'
import envConfig from '../../../envConfig'

class UserProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFriendster: true,
      externalAuth: false,
      currentPlatform: null,
      appState: AppState.currentState,
      socialMediaData: SOCIAL_MEDIA_DATA
    }
  }

  triggerFriendster = () => {
    const { showFriendster } = this.state
    this.setState({ showFriendster: !showFriendster })
  }

  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserId } = this.props
    AppState.addEventListener('change', this._handleAppStateChange);

    if (apiAccessToken) {
      getUserId(apiAccessToken)
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

      if (Linking.canOpenURL(deepLinkAuth) && false) {
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
    this.setState({currentPlatform: platform})
    this.props.socialMediaAuth(platform, this.props.userId)
  }

  socialPlatformPresent = (provider) => {
    return this.props.platforms.find(platformObj =>
      platformObj.provider === provider
    )
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
      platforms
    } = this.props
    const { showFriendster, socialMediaData } = this.state
    const { devGoogleBaseURL, devGoogleApiParams, devGoogleClientId } = envConfig.Development

    return (
        <ScrollView style={showFriendster ? { opacity: 0.3 } : ''}>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
          <PickSocialMediaModal
            triggerModal={this.triggerFriendster}
            showModal={showFriendster}
          />
            <View style={styles.profileHeader}>
              <View style={styles.profHeaderTop}>
                <Image
                  style={styles.profileImage}
                  source={{uri: `${userInfo.picture.data.url}`}} />
              </View>
              <Text style={styles.profileSubtext}>
              {`${userInfo.name}`}
              </Text>
              <Text style={styles.interestsText}>
                  {userInterests.join(' | ')}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-around'}}>
                <Icon
                  name='location'
                  type='entypo'
                  size={14}
                  color='#fff'
                />
                <Text style={{ color: '#fff', fontWeight: '500', backgroundColor: 'transparent', marginLeft: 7}}>
                  {userLocation}
                </Text>
              </View>
              <ConnectButton
                color='#fff'
                title='EDIT PROFILE'
                containerStyle={styles.button}
                textStyle={styles.buttonTextStyle}
                onPressCallback={() => navigation.navigate('EditProfileInfoScreen')}
              />
            </View>
            </LinearGradient>
            <View style={styles.socialIconSlider}>
            </View>
            <View style={styles.socialAccountContainer}>
            {
              Object.keys(socialMediaData).map((socialPlatform, idx) => {
                const currentPlatform = this.socialPlatformPresent(socialPlatform)
                const userName = currentPlatform ? currentPlatform['access_token'][socialMediaData[socialPlatform]['userNamePath']] : null
                const isSynced = !!currentPlatform

                return (
                  <SocialMediaCard
                    key={idx}
                    platformName={socialPlatform[0].toUpperCase() + socialPlatform.slice(1)}
                    selected={isSynced}
                    socialAuth={(platform) => this.authenticateSocialMedia(platform)}
                    platformAuth={socialPlatform}
                    userName={userName}
                  />
                )
              })
            }
            </View>
            <View>
              <Navbar
                navbarStyle={styles.userProfNavbar}
                navigation={navigation}
                current='Profile'
                margin={207}
              />
            </View>
        </ScrollView>
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
  platforms: state.tokenStore.platforms,
  needsFetchTokens: state.tokenStore.needsFetchTokens,
  authRedirectUrl: state.tokenStore.authRedirectUrl
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      getUserId,
      socialMediaAuth,
      getUserTokens
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
