import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Libraries
import { SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import FBSDK, { LoginManager, LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'

// Components
import ConnectButton from './SuperConnectScreen/ConnectButton'
import FBLogin from './FBLogin'
import Footer from './UtilityComponents/Footer'

// Config
import envConfig from '../../envConfig'

//Redux Actions
import UserStoreActions, { fbUserInfo } from '../Redux/UserStore'
import FriendStoreActions, { setFriendInfo } from '../Redux/FriendStore'
import AuthStoreActions, { loginByFacebook } from '../Redux/AuthStore'

// Styles
import styles from './Styles/LaunchScreenStyles'
import footerStyles from './Styles/FooterStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      loading: false
    }
  }

  componentWillUpdate = nextProps => {
    const { fbAuthToken } = this.props

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
    const { fbUserInfo, navigation, setFriendInfo, users, loginByFacebook } = this.props

    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
        return error
      } else {
        fbUserInfo(result)
        navigation.navigate('PermissionScreen', {
          permissionType: 'geolocation',
          navigation: navigation,
          users: users,
          setFriendInfo: setFriendInfo
        })
      }
    }

    loginByFacebook({
      client_id: envConfig.Development.devClientId,
      client_secret: envConfig.Development.devClientSecret,
      grant_type: 'convert_token',
      backend: 'facebook',
      token: accessToken
    })

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
    )

    new GraphRequestManager()
    .addRequest(infoRequest)
    .start()
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
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.linearGradient}
          >
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Image
                style={{ marginTop: 100 }} source={require('../Images/logo.png')}
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
                  <View style={styles.loading, { marginTop: 40 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                  )
                :
                <View>
                  <FBLogin
                    loggedIn={!!fbAuthToken}
                    handleLoading={this.handleLoading}
                    handleLoadingComplete={this.handleLoadingComplete}
                  />
                  <ConnectButton
                    title='Start With Email'
                    color='#fff'
                    containerStyle={styles.button}
                    textStyle={styles.buttonTextStyle}
                    onPressCallback={() => navigate('RegisterUserScreen')}
                  />
                </View>
              }
            </View>
          </ScrollView>
          <Footer
            navigationCallback={() => navigate('LoginScreen')}
            styles={footerStyles}/>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fbAuthToken: state.fbStore.fbAccessToken,
  users: state.facebook.users,
  userData: state.userStore,
  nav: state.nav
})

const mapDispatchToProps = dispatch => {
  const { fbUserInfo } = UserStoreActions
  return {
    ...bindActionCreators({
      fbUserInfo,
      setFriendInfo,
      loginByFacebook
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
