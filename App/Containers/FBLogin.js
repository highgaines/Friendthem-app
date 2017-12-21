import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { SocialIcon } from 'react-native-elements';
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import SInfo from 'react-native-sensitive-info';

import FBStoreActions from '../Redux/FBStore';
import styles from './Styles/LaunchScreenStyles';

class FBLogin extends Component {

  handleFBLogin = () => {
    const userPermissions = ["public_profile", "user_friends", "email"]
    const { handleLoading, handleLoadingComplete } = this.props
    handleLoading()
    LoginManager.logInWithReadPermissions(userPermissions).then((result) => {
      if (result.isCancelled) {
          handleLoadingComplete()
          console.log('Login cancelled')
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            this.props.fbLoginComplete(data.accessToken)
          })
        }
      },
      (error) =>  {
        console.log('Login fail with error: ' + error)
      }
    )
  }

  handleFBLogout = () => {
    LoginManager.logOut();
    //More stylistic way to do this?
    alert('Logging out of Facebook...')
    this.props.fbLogoutComplete();
  }

  render() {
    return (
      <View style={styles.section} >
      {
        this.props.loggedIn ?
        (
          <SocialIcon
            button
            iconSize={15}
            title='Logout'
            onPress={this.handleFBLogout}
            type='facebook'
          />
        )
        :
        (
          <SocialIcon
            button
            iconSize={15}
            title='Start With Facebook'
            onPress={this.handleFBLogin}
            type='facebook'
          />
        )
      }
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fbLoginComplete: (error, result) => dispatch(FBStoreActions.loginComplete(error, result)),
    fbLogoutComplete: () => dispatch(FBStoreActions.logoutComplete())
  }
}

export default connect(null, mapDispatchToProps)(FBLogin)
