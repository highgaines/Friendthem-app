
import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
// Styles
import styles from './Styles/LaunchScreenStyles';
import { SocialIcon } from 'react-native-elements';


class LaunchScreen extends Component {

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if(result.isCancelled) {
        console.log('Login cancelled')
      } else {
        console.log('Login Success:' + result.grantedPermissions)
      }
    }, function(error) {
        console.log('An error occured:' + error)
      })
  }

  _twitterAuth() {
    console.log('twitter auth')
  }

  render () {
    const { navigate } = this.props.navigation
    const { users } = this.props
    this._fbAuth = this._fbAuth.bind(this)

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
              <Image
                style={{ marginTop: 150 }} source={require('../Images/logo.png')}
              />
              <Text style={styles.primSubText}>
                CONNECTING THE WORLD
              </Text>
              <Text style={styles.secSubText}>
                Life Happens when people connect
              </Text>
            </View>
            <View style={styles.section} >
              <SocialIcon
                button
                title='Sign In With Facebook'
                onPress={this._fbAuth}
                type='facebook'
              />
              <SocialIcon
                button
                title='Sign In With Twitter'
                onPress={this._twitterAuth}
                type='twitter'
              />
              <Button
                title='Go to Nearby Users'
                onPress={() => navigate('NearbyUsersScreen', {numUsers: 2, users: users, navigation: this.props.navigation })}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  users: state.facebook.users
})

export default connect(mapStateToProps)(LaunchScreen)
