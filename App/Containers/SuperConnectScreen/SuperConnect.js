import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Button, AppState, Linking } from 'react-native'
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

    this.state = {
      appState: AppState.currentState,
      manualPlatforms: MANUAL_CONNECT_PLATFORMS,
      userInputRequiredPlatforms: []
    }
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUpdate = nextProps => {
    const { manualPlatforms, friendInfo } = this.props

    if (!manualPlatforms.length && nextProps.manualPlatforms.length) {
      if (manualPlatforms.includes('facebook')) {
        debugger
      }
    }
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      const friendListRequest = new GraphRequest(
        `/${this.props.userData.id}/friends/${this.props.friendInfo.id}`,
        {
          accessToken: this.props.fbAuthToken,
        },
        (error, result) => {
          if(result && !error) {
            this.props.navigation.navigate('CongratulatoryScreen', {
              friendInfo: this.props.friendInfo,
              navigation: this.props.navigation
            })
          } else {
            console.log(error, result)
          }
        }
      )
      new GraphRequestManager().addRequest(friendListRequest).start();
    }
    this.setState({ appState: nextAppState });
  }

  superConnectPromiseLoop = () => {
    const { selectedSocialMedia, friendInfo, superConnectPlatform, apiAccessToken, setManualPlatforms } = this.props
    const { userInputRequiredPlatforms, manualPlatforms } = this.state

    for (let i = 0; i < selectedSocialMedia.length; i++) {
      if (manualPlatforms.includes(selectedSocialMedia[i])) {
        userInputRequiredPlatforms.push(selectedSocialMedia[i])
      } else {
          superConnectPlatform(selectedSocialMedia[i], apiAccessToken, friendInfo.id).then(resp => {
            if (resp) {
              return true
            } else {
              return false
            }
        })
      }
    }
    setManualPlatforms(userInputRequiredPlatforms)
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

  render() {
    const { userData, friendInfo, navigation, selectedSocialMedia, togglePlatform, platforms } = this.props

    return(
      <View style={{ flex: 1 }}>
        <ConnectBar userData={userData} friendInfo={friendInfo}/>
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
            superConnectPromiseLoop={this.superConnectPromiseLoop}
            navigation={navigation}
            facebookUrl={friendInfo.fbUrl}
            friendName={friendInfo.name} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.userStore.userData,
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
