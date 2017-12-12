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

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: ''
    }
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
                onPress={fbLogin}
                type='facebook'
              />
              <LoginButton
                publishPermissions={["publish_actions"]}
                permissions={["public_profile", "user_friends", "user_location", "user_photos"]}
                onLoginFinished={fbLogin}
                onLogoutFinished={() => console.log('logged out')} />
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
  fbAuthToken: state.fbStore.fbAccessToken,
  users: state.facebook.users
})

const mapDispatchToProps = dispatch => {
  return {
    fbLogin: (error, result) => dispatch(FBStoreActions.login(error, result))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
