import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
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
      user: '',
      loading: false
    }
  }

  componentWillUpdate = nextProps => {
    const { fbAuthToken } = this.props;

    if (!fbAuthToken && nextProps.fbAuthToken) {
      this.getFbProfile(nextProps.fbAuthToken)
    }
  }

  handleLoading = () => {
    this.setState({ loading: true })
  }

  handleLoadingComplete = () => {
    this.setState({ loading: false })
  }

  getFbProfile = accessToken => {
    const { userInfoRequestSuccess, navigation, setFriendInfo, users } = this.props;

    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
        return error
      } else {
        userInfoRequestSuccess(result)
        navigation.navigate('NearbyUsersScreen', {
          numUsers: users.length,
          users: users,
          navigation: this.props.navigation,
          setFriendInfo: setFriendInfo
        })
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

    new GraphRequestManager()
    .addRequest(infoRequest)
    .start();
  }

  render () {
    const { navigate } = this.props.navigation
    const { users, setFriendInfo, fbAuthToken } = this.props
    const { loading } = this.state



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
              {loading
                ? (
                  <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                  )
                : <FBLogin
                loggedIn={!!fbAuthToken}
                handleLoading={this.handleLoading}
                handleLoadingComplete={this.handleLoadingComplete}
                />
              }
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fbAuthToken: state.fbStore.fbAccessToken,
  users: state.facebook.users,
  userData: state.userStore
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
