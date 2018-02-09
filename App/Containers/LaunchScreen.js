import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native'

// Libraries
import { SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import FBSDK, { LoginManager, LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import Permissions from 'react-native-permissions'

// Components
import ConnectButton from './SuperConnectScreen/ConnectButton'
import FBLogin from './FBLogin'
import Footer from './UtilityComponents/Footer'

// Config
import envConfig from '../../envConfig'

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { fbUserInfo } from '../Redux/UserStore'
import FriendStoreActions from '../Redux/FriendStore'
import AuthStoreActions, { loginByFacebook } from '../Redux/AuthStore'
import PermissionsStoreActions from '../Redux/PermissionsStore'

// Images
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import footerStyles from './Styles/FooterStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      loading: false,
      error: null
    }
  }

  componentWillMount = () => {
    console.log('hit willmount')
    this.checkPermissions()
    if (this.props.loggedIn) {
      this.props.navigation.navigate('UserProfileScreen')
    }
  }

  componentWillUpdate = nextProps => {
    const { fbAuthToken } = this.props

    if (!fbAuthToken && nextProps.fbAuthToken && this.state.loading) {
      this.getFbProfile(nextProps.fbAuthToken)
      this.handleLoadingComplete()
    }
  }

  // componentDidUpdate = prevProps = {
  //   const { locationPermission, notificationPermission } = this.props
  //   const permissionsGranted = locationPermission && notificationPermission
  //
  //
  // }

  checkPermissions = () => {
    const { setGeoPermission, setNotifPermission } = this.props

    Permissions.check('location', { type: 'always' }).then(response => {
      console.log(response)
      if (response === 'authorized') {
        setGeoPermission(true)
      }
    })
    Permissions.check('notification').then(response => {
      if (response === 'authorized') {
        setNotifPermission(true)
      }
    })
  }

  handleLoading = () => {
    this.setState({ loading: true })
  }

  handleLoadingComplete = () => {
    this.setState({ loading: false })
  }

  getFbProfile = accessToken => {
    const { fbUserInfo, navigation, loginByFacebook } = this.props

    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
        return error
      } else {
        fbUserInfo(result)
        navigation.navigate('PermissionScreen', {
          permissionType: 'geolocation',
          navigation: navigation
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
    const { users, fbAuthToken, logoutUser } = this.props
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
  nav: state.nav,
  loggedIn: state.authStore.loggedIn,
  fbAuthToken: state.fbStore.fbAccessToken,
})

const mapDispatchToProps = dispatch => {
  const { logoutUser } = AuthStoreActions
  const { fbUserInfo } = UserStoreActions
  const {
    setGeoPermission,
    setNotifPermission,
    setLocationInterval
  } = PermissionsStoreActions

  return {
    ...bindActionCreators({
      logoutUser,
      fbUserInfo,
      loginByFacebook,
      setLocationInterval
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
