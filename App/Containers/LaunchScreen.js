import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import FBSDK, { LoginManager, LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

//Redux Actions
import UserStoreActions from '../Redux/UserStore';
import FriendStoreActions from '../Redux/FriendStore'

// Styles
import styles from './Styles/LaunchScreenStyles';

//Child Components
import FBLogin from './FBLogin'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: ''
    }
  }

  componentWillUpdate = nextProps => {
    const { fbAuthToken } = this.props;

    if (!fbAuthToken && nextProps.fbAuthToken) {
      this.getFbProfile(nextProps.fbAuthToken)
    }
  }

  getFbProfile = accessToken => {
    const { userInfoRequestSuccess, navigation } = this.props;
    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
        return error
      } else {
        userInfoRequestSuccess(result)
        navigation.navigate('UserProfileScreen')
        // SInfo is a storage library for React Native that securely stores
        // any sensitive information using the iOS keychain, still contemplating
        // whether it is necessary at this stage of development
        //SInfo.setItem('userFBProfile', result, {})
      }
    }
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name,id,picture'
          }
        }
      },
      responseInfoCallback
    );

  // Start the graph request.
    new GraphRequestManager()
    .addRequest(infoRequest)
    .start();
  }

  render () {
    const { navigate } = this.props.navigation
    const { users, setFriendInfo } = this.props

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
              <FBLogin />
              <SocialIcon
                button
                title='Sign In With Twitter'
                onPress={this._twitterAuth}
                type='twitter'
              />
              <Button
                title='Go to Nearby Users'
                onPress={() =>
                  navigate('NearbyUsersScreen', {
                    numUsers: 2,
                    users: users,
                    navigation: this.props.navigation,
                    setFriendInfo: setFriendInfo
                  })
                }
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
    userInfoRequestSuccess: (userInfo) =>
      dispatch(UserStoreActions.fbUserInfo(userInfo)),
    setFriendInfo: (friendInfo) =>
      dispatch(FriendStoreActions.setFriendInfo(friendInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
