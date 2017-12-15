import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import ConnectBar from './ConnectBar';
import PlatformsContainer from './PlatformsContainer';
import ButtonsContainer from './ButtonsContainer';

class SuperConnect extends Component {
  constructor(props) {
    super(props)
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
    debugger
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
  userData: state.userStore.userFbData,
  friendData: state.friendStore.friendData
})

export default connect(mapStateToProps)(SuperConnect)
