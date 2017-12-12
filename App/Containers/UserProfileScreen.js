import React, { Component } from 'react'
import connect from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements';

import styles from './Styles/LaunchScreenStyles';

class UserProfileScreen extends Component {
  componentWillMount() {
    //check for user info if there is none then check for social media auth tokens
    //if all come up null redirect to the login page, if there is one then send a request for user info
    // to the appropriate social media API
  }
  render() {
    const { userInfo } = this.props;
    return (
      <View>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
          style={styles.linearGradient}>

        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userInfo,
  fbAuthToken: state.fbStore.fbAccessToken
})

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
