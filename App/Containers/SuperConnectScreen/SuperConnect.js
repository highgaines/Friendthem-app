import React, { Component } from 'react';
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
import { MANUAL_CONNECT_PLATFORMS } from '../../Utils/constants'

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
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { manualPlatforms, friendInfo, platforms, setManualPlatforms } = this.props
    const { userInputRequiredPlatforms, manualPlatformIndex } = this.state
    const manualPlatformsUpdated = manualPlatforms.length && !prevProps.manualPlatforms.length
    const maxIndex = manualPlatformIndex === manualPlatforms.length

    if (manualPlatformsUpdated || (manualPlatformIndex > prevState.manualPlatformIndex && !maxIndex)) {
      this.deepLinkToPlatform(userInputRequiredPlatforms[manualPlatformIndex])
    } else if (maxIndex && manualPlatformIndex === prevState.manualPlatformIndex && manualPlatforms.length) {
        setManualPlatforms([])
        this.props.navigation.navigate('CongratulatoryScreen', {
          userInfo: this.props.userInfo,
          friendInfo: this.props.friendInfo,
          navigation: this.props.navigation,
          snapchatDeeplink: this.snapchatDeepLinkCallback
        })
    }
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  deepLinkToPlatform = (platformName) => {
    const { manualPlatforms, friendInfo, platforms } = this.props
    const profile = friendInfo.social_profiles.find(profile => profile.provider === platformName)
    const userIdentifier = platformName === 'facebook' ? profile.uid : profile.username
    const deepLinkURL = `${platformName}://${userIdentifier}`

    Linking.canOpenURL(deepLinkURL).then(response => {
      if (response) {
        Linking.openURL(deepLinkURL)
      } else {
        Linking.openURL(`https:/${platformName}.com/${userIdentifier}`)
      }
    })
  }

  _handleAppStateChange = (nextAppState) => {
    const { manualPlatforms, platforms } = this.props
    const { manualPlatformIndex, appState } = this.state
    const returningToApp = appState.match(/inactive|background/) && nextAppState === 'active'
    const connectFB = platforms.find(elem => elem.provider === 'facebook')

    if (returningToApp && manualPlatformIndex < manualPlatforms.length) {
      this.setState({ manualPlatformIndex: manualPlatformIndex + 1 })
    }

    this.setState({ appState: nextAppState });
  }

  asyncSuperConnectPlatform = async (platform, apiAccessToken, friendId) => {
    await this.props.superConnectPlatform(platform, apiAccessToken, friendId)
  }

  superConnectPromiseLoop = () => {
    const { selectedSocialMedia, friendInfo, superConnectPlatform, apiAccessToken, setManualPlatforms } = this.props
    const { userInputRequiredPlatforms, manualPlatformsList } = this.state
    let platform;

    this.setState({ connectionModalOpen: true })
    for (let i = 0; i < selectedSocialMedia.length; i++) {
      this.setState({ connectionStepCount: i + 1 })
      platform = selectedSocialMedia[i]

      if (platform === 'snapchat') {
        continue
      } else if (manualPlatformsList.includes(platform)) {
        userInputRequiredPlatforms.push(platform)
      } else {
        this.asyncSuperConnectPlatform(platform, apiAccessToken, friendInfo.id)
      }
    }
    this.setState({connectionModalOpen: false },
      () => {
        if (userInputRequiredPlatforms.length) {
          setManualPlatforms(userInputRequiredPlatforms)
        } else {
            this.props.navigation.navigate('CongratulatoryScreen', {
              userInfo: this.props.userInfo,
              friendInfo: this.props.friendInfo,
              navigation: this.props.navigation,
              snapchatDeeplink: this.snapchatDeepLinkCallback
            })
        }
      })
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

  snapchatDeepLinkCallback = () => {
    const { friendInfo } = this.props
    const snapInfo = friendInfo.social_profiles.find(profile => profile.provider === 'snapchat')

    Linking.openURL(`snapchat://add/${snapInfo.username}`)
  }

  render() {
    const { userInfo, friendInfo, navigation, selectedSocialMedia, togglePlatform, platforms } = this.props
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
        <ConnectBar userData={userInfo} friendInfo={friendInfo}/>
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
            navigation={navigation}
            facebookUrl={friendInfo.fbUrl}
            friendName={`${friendInfo.first_name}`} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userData,
  platforms: state.tokenStore.platforms,
  friendInfo: state.friendStore.friendData,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  manualPlatforms: state.superConnect.manualPlatforms,
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
