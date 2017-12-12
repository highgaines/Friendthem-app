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
    LoginManager.logInWithReadPermissions(userPermissions).then((result) => {
      if (result.isCancelled) {
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

  render() {
    return (
      <View style={styles.section} >
        <SocialIcon
          button
          title='Sign In With Facebook'
          onPress={this.handleFBLogin}
          type='facebook'
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fbLoginComplete: (error, result) => dispatch(FBStoreActions.loginComplete(error, result))
  }
}

export default connect(null, mapDispatchToProps)(FBLogin)
