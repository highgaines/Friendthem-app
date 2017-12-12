import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements';

import styles from './Styles/LaunchScreenStyles';

class UserProfileScreen extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      userInfo ?
        <View>
          <LinearGradient
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
            style={styles.linearGradient}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: `${userInfo.picture.data.url}`}} />
            <Text>{`Hello, ${userInfo.name}`}</Text>
          </LinearGradient>
        </View>
        :
        <Text>No user info loaded</Text>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userFbData,
  fbAuthToken: state.fbStore.fbAccessToken
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
