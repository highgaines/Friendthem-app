import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';
import FBSDK, { LoginManager } from 'react-native-fbsdk'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

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

  render () {
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
              <Image source={Images.launch} style={styles.logo} />
            </View>

            <View style={styles.section} >
              <Image source={Images.ready} />
              <TouchableOpacity onPress={this._fbAuth}>
                <Text style={styles.sectionText}>
                  Login with Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}
