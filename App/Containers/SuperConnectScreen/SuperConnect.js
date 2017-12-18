import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button, AppState } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import ConnectBar from './ConnectBar';
import PlatformsContainer from './PlatformsContainer';
import ButtonsContainer from './ButtonsContainer';
import FBSDK, { AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

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
      console.log('hit')
      const friendListRequest = new GraphRequest(
        `/${this.props.userData.id}/friends/${this.props.friendData.id}`,
        {
          accessToken: this.props.fbAuthToken,
        },
        (error, result) => {
          if(result && !error) {
            debugger
          } else {
            console.log(error, result)
          }
        }
      )
      new GraphRequestManager().addRequest(friendListRequest).start();
    }
    this.setState({appState: nextAppState});
  }

  render() {
    const { userData, friendData, navigation } = this.props
    // dummy data
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
        <PlatformsContainer
          navigation={navigation}
          platforms={platforms}
          inverted={true}/>
        <View style={{ alignItems: 'center' }}>
          <ButtonsContainer
            navigation={navigation}
            facebookUrl={friendData.fbUrl}
            friendName="Cyclops" />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fbAuthToken: state.fbStore.fbAccessToken,
  userData: state.userStore.userFbData,
  friendData: state.friendStore.friendData
})

export default connect(mapStateToProps)(SuperConnect)
