import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import RoundedButton from '../Components/RoundedButton';
// Styles
import styles from './Styles/LaunchScreenStyles';
import { SocialIcon } from 'react-native-elements';

export default class LaunchScreen extends Component {

  LogInWithFacebook() {
    console.log('logging in to facebook!')
  }

  LogInWithTwitter() {
    console.log('logging in to twitter!')
  }

  render () {
    debugger
    return (
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
          style={styles.linearGradient}
          >
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Text style={styles.title}>
                FriendThem
              </Text>
            </View>

            <View style={styles.section} >
              <SocialIcon
                button
                title='Sign In With Facebook'
                onPress={this.LogInWithFacebook}
                type='facebook'
              />
              <SocialIcon
                button
                title='Sign In With Twitter'
                onPress={this.LogInWithTwitter}
                type='twitter'
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}
