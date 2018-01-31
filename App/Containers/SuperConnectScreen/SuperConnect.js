import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Button, AppState } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import { SocialIcon } from 'react-native-elements'
import ConnectBar from './ConnectBar'
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer';
import ButtonsContainer from './ButtonsContainer'
import FBSDK, { AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import SuperConnectActions, { superConnectPlatform } from '../../Redux/SuperConnectStore'

class SuperConnect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      const friendListRequest = new GraphRequest(
        `/${this.props.userData.id}/friends/${this.props.friendData.id}`,
        {
          accessToken: this.props.fbAuthToken,
        },
        (error, result) => {
          if(result && !error) {
            this.props.navigation.navigate('CongratulatoryScreen', {
              friendData: this.props.friendData,
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
    const { selectedSocialMedia, friendData, superConnectPlatform, apiAccessToken } = this.props

    for (let i = 0; i < selectedSocialMedia.length; i++) {
      superConnectPlatform(selectedSocialMedia[i], apiAccessToken, friendData.id).then(resp => {
        if (resp) {
          return true
        } else {
          return false
        }
      })
    }
  }

  render() {
    const { userData, friendData, navigation, selectedSocialMedia, togglePlatform } = this.props

    const platforms = [
      {
        platformName: 'facebook',
        userName: 'theOGwolverine',
        selected: true
      }
    ]
    return(
      <View style={{ flex: 1 }}>
        <ConnectBar userData={userData} friendData={friendData}/>
        <SocialMediaCardContainer
          fromFriendProfile={true}
          onPressCallback={(platform) => togglePlatform(platform)}
          platformSelected={socialMedia => selectedSocialMedia.includes(socialMedia)}
        />
        <View style={{ alignItems: 'center' }}>
          <ButtonsContainer
            superConnectPromiseLoop={this.superConnectPromiseLoop}
            navigation={navigation}
            facebookUrl={friendData.fbUrl}
            friendName={friendData.name} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.userStore.userData,
  friendData: state.friendStore.friendData,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  selectedSocialMedia: state.superConnect.selectedSocialMedia
})

const mapDispatchToProps = dispatch => {
  const { togglePlatform } = SuperConnectActions
  return {
    ...bindActionCreators({
      togglePlatform,
      superConnectPlatform
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperConnect)
