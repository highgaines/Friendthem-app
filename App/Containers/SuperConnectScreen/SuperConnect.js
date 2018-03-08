import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Button, AppState, Linking, Modal } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FBSDK, { AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import LinearGradient from 'react-native-linear-gradient'
import { SocialIcon } from 'react-native-elements'

import ConnectBar from './ConnectBar'
import ButtonsContainer from './ButtonsContainer'
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer';
import SuperConnectActions, { superConnectPlatform } from '../../Redux/SuperConnectStore'
import { MANUAL_CONNECT_PLATFORMS, SOCIAL_MEDIA_DATA } from '../../Utils/constants'

class SuperConnect extends Component {
  constructor(props) {
    super(props)

    this._handleAppStateChange = this._handleAppStateChange.bind(this)

    this.state = {
      fbToken: null,
      connectionStepCount: null,
      connectionModalOpen: false,
      userInputRequiredPlatforms: [],
      appState: AppState.currentState,
      manualPlatformsList: MANUAL_CONNECT_PLATFORMS,
      manualPlatformIndex: 0
    }

    this.initialState = this.state
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { friendInfo, platforms, setManualPlatforms } = this.props
    const { userInputRequiredPlatforms, manualPlatformIndex } = this.state
    const manualPlatformsUpdated = userInputRequiredPlatforms.length && !prevState.userInputRequiredPlatforms.length
    const maxIndex = manualPlatformIndex === userInputRequiredPlatforms.length

    if (manualPlatformsUpdated || (manualPlatformIndex > prevState.manualPlatformIndex && !maxIndex)) {
      if (userInputRequiredPlatforms[manualPlatformIndex]) {
        this.deepLinkToPlatform(userInputRequiredPlatforms[manualPlatformIndex])
      }
    }
    if (maxIndex && manualPlatformIndex === prevState.manualPlatformIndex && userInputRequiredPlatforms.length) {
        this.setState(this.setState(this.initialState), () => setManualPlatforms([]))
        this.props.navigation.navigate('CongratulatoryScreen', {
          userInfo: this.props.userInfo,
          friendInfo: this.props.friendInfo,
          navigation: this.props.navigation,
          snapchatDeeplink: this.snapchatDeepLinkCallback
        })
    }
  }

  componentWillUnmount = () => {
    this.props.setManualPlatforms([])
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  deepLinkToPlatform = (platformName) => {
    const { friendInfo, platforms } = this.props
    const profile = friendInfo.social_profiles.find(profile => profile.provider === platformName)
    const userIdentifier = platformName === 'facebook' ? profile.uid : profile.username
    const deepLinkPlatform = SOCIAL_MEDIA_DATA[platformName].superConnectDeepLink
    const deepLinkURL = `${deepLinkPlatform}${userIdentifier}`

    Linking.canOpenURL(deepLinkURL).then(response => {
      if (response) {
        Linking.openURL(deepLinkURL)
      } else {
        Linking.openURL(`https:/${platformName}.com/${userIdentifier}`)
      }
    })
  }

  _handleAppStateChange = (nextAppState) => {
    const { platforms, apiAccessToken, friendInfo } = this.props
    const { manualPlatformIndex, appState, userInputRequiredPlatforms } = this.state
    const returningToApp = appState.match(/inactive|background/) && nextAppState === 'active'
    const connectFB = platforms.find(elem => elem.provider === 'facebook')

    if (returningToApp && manualPlatformIndex < userInputRequiredPlatforms.length) {
      this.asyncSuperConnectPlatform(userInputRequiredPlatforms[manualPlatformIndex], apiAccessToken, friendInfo.id)
      this.setState({ manualPlatformIndex: manualPlatformIndex + 1 })
    }

    this.setState({ appState: nextAppState });
  }

  asyncSuperConnectPlatform = async (platform, apiAccessToken, friendId) => {
    const platName = platform === 'google-oauth2' ? "youtube" : platform
    await this.props.superConnectPlatform(platName, apiAccessToken, friendId)
  }

  superConnectPromiseLoop = () => {
    const { selectedSocialMedia, friendInfo, superConnectPlatform, apiAccessToken, setManualPlatforms, userId } = this.props
    const { userInputRequiredPlatforms, manualPlatformsList } = this.state
    let platform = ''
    let tempUserInputArr = []

    for (let i = 0; i < selectedSocialMedia.length; i++) {
      platform = selectedSocialMedia[i]

      if (manualPlatformsList.includes(platform)) {
        tempUserInputArr.push(platform)
      } else {
        this.asyncSuperConnectPlatform(platform, apiAccessToken, friendInfo.id, userId)
      }
    }
    if (tempUserInputArr.length) {
      this.setState({ userInputRequiredPlatforms: tempUserInputArr })
    } else {
        this.setState(this.initialState)
        this.props.navigation.navigate('CongratulatoryScreen', {
          userInfo: this.props.userInfo,
          friendInfo: this.props.friendInfo,
          navigation: this.props.navigation,
          snapchatDeeplink: this.snapchatDeepLinkCallback
        })
      }
  }

  socialPlatformPresent = (provider) => {
    const { platforms, userInfo } = this.props

    switch (provider) {
      case 'snapchat':
        return userInfo.social_profiles.find(elem => elem.provider === 'snapchat')
      case 'youtube':
        return platforms.find(platformObj => platformObj.provider === 'google-oauth2')
      default:
        return platforms.find(platformObj => platformObj.provider === provider)
    }
  }

  render() {
    const { userInfo, friendInfo, navigation, selectedSocialMedia, togglePlatform, platforms, copy } = this.props
    const { connectionModalOpen, connectionStepCount } = this.state

    return(
      <View style={{ flex: 1 }}>
        { connectionModalOpen ?
            <Modal>
              <Text>
                {`Connecting: Step ${connectionStepCount} of ${selectedSocialMedia.length}`}
              </Text>
            </Modal>
          : null
        }
        <ConnectBar copy={copy} userData={userInfo} friendInfo={friendInfo}/>
        <SocialMediaCardContainer
          fromFriendProfile={true}
          friendPlatforms={friendInfo.social_profiles}
          onPressCallback={(platform) => togglePlatform(platform)}
          platformSynced={platform => this.socialPlatformPresent(platform)}
          platformSelected={socialMedia =>
            selectedSocialMedia.includes(socialMedia)
          } />
        <View style={{ alignItems: 'center' }}>
          <ButtonsContainer
            superConnectPromiseLoop={selectedSocialMedia.length ?
              this.superConnectPromiseLoop : () => false
            }
            copy={this.props.copy}
            navigation={navigation}
            facebookUrl={friendInfo.fbUrl}
            friendName={`${friendInfo.first_name}`} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  platforms: state.tokenStore.platforms,
  friendInfo: state.friendStore.friendData,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  selectedSocialMedia: state.superConnect.selectedSocialMedia
})

const mapDispatchToProps = dispatch => {
  const { togglePlatform, setManualPlatforms } = SuperConnectActions

  return {
    ...bindActionCreators({
      togglePlatform,
      setManualPlatforms,
      superConnectPlatform
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperConnect)
