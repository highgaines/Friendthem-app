import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import ConnectBar from './ConnectBar';
import PlatformsContainer from './PlatformsContainer';
import ButtonsContainer from './ButtonsContainer';

export default class SuperConnect extends Component {
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

    return(
      <View style={{ flex: 1 }}>
        <ConnectBar userData={userData} friendData={friendData}/>
        <PlatformsContainer navigation={navigation} platforms={platforms} />
        <View style={{ alignItems: 'center' }}>
          <ButtonsContainer navigation={navigation} friendName="Cyclops" />
        </View>
      </View>
    )
  }
}
