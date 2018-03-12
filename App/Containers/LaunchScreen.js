import React, { Component } from 'react'
import { ScrollView, Text, Image, View,
         TouchableOpacity, Button,
         ActivityIndicator } from 'react-native'

// Libraries
import { SocialIcon } from 'react-native-elements'
import FBSDK, {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk'
import Permissions from 'react-native-permissions'
import Contacts from 'react-native-contacts'

// Components
import ConnectButton from './SuperConnectScreen/ConnectButton'
import FBLogin from './FBLogin'
import Footer from './UtilityComponents/Footer'

// HOC
import LinearGradientWrapper from '../HOCs/LinearGradientWrapper'

// Config
import envConfig from '../../envConfig'

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { fbUserInfo } from '../Redux/UserStore'
import FriendStoreActions from '../Redux/FriendStore'
import AuthStoreActions, { loginByFacebook } from '../Redux/AuthStore'
import PermissionsStoreActions from '../Redux/PermissionsStore'
import { storeContactInfo } from '../Redux/InviteUsersStore'

// Images
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import footerStyles from './Styles/FooterStyles'
import { ifIphoneX } from '../Themes/Helpers'
import navigationAware from '../Navigation/navigationAware'

// Utils
import { isIOS, isAndroid } from '../Utils/constants'
import { RequestContactsPermission, RequestLocationPermission } from '../Utils/functions'
import OneSignal from 'react-native-onesignal';

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
    this.checkPermissions()

    if (this.props.loggedIn) {
      this.props.navigation.navigate('NearbyUsersScreen')
    }

  }

  componentWillUpdate = nextProps => {
    const { fbAuthToken } = this.props

    if (!fbAuthToken && nextProps.fbAuthToken && this.state.loading) {
      this.getFbProfile(nextProps.fbAuthToken)
      this.handleLoadingComplete()
    }

    if (nextProps.loggedIn && nextProps.routeName === 'LaunchScreen') {
      nextProps.navigation.navigate('NearbyUsersScreen')
    }

  }

  componentDidUpdate = (prevProps) => {
    const { contactList, storeContactInfo,
            customNotificationPermission,
            nativeNotifications, setNotifPermission,
            loggedIn } = this.props
    const hasContacts = contactList.length > 0

    if (!isAndroid) {
      return
    } else if (!customNotificationPermission) {
      OneSignal.getPermissionSubscriptionState((status) => {
        if (status.notificationsEnabled) {
          setNotifPermission(true)
        }
      })
    }
  }

  checkPermissions = () => {
    const { setGeoPermission, setNotifPermission, setNativeContactsPermission } = this.props
    Permissions.check('location', { type: 'always' }).then(response => {
      if (response === 'authorized') {
        setGeoPermission(true)
      }
    })
    if (isIOS) {
      Permissions.check('notification').then(response => {
        if (response === 'authorized') {
          setNotifPermission(true)
        }
      })
    }
    Contacts.checkPermission( (err, permission) => {
      if (permission === 'authorized') {
        setNativeContactsPermission(true)
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

    const { fbUserInfo, navigation, loginByFacebook, nativeGeolocation, nativeNotifications } = this.props

    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
        return error
      } else {
        fbUserInfo(result)
        if (!nativeGeolocation) {
          navigation.navigate('PermissionScreen', {
            permissionType: 'geolocation',
            navigation: navigation
          })
        } else if (!nativeNotifications) {
          navigation.navigate('PermissionScreen', {
            permissionType: 'notifications',
            navigation: navigation
          })
        } else {
          navigation.navigate('ForkScreen')
        }
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
    const { users, fbAuthToken, logoutUser, fbLoginComplete } = this.props
    const { loading } = this.state

    return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Image
                style={ifIphoneX({ marginTop: 200 }, { marginTop: 100 })} source={require('../Images/logo.png')}
              />
              <Text style={styles.primSubText}>
                CONNECTING THE WORLD
              </Text>
              <Text
                testID={'catch_phrase'} style={styles.secSubText}>
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
            isLaunchScreen
            styles={footerStyles}/>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  loggedIn: state.authStore.loggedIn,
  fbAuthToken: state.fbStore.fbAccessToken,
  nativeGeolocation: state.permissionsStore.nativeGeolocation,
  nativeNotifications: state.permissionsStore.nativeNotifications,
  contactList: state.inviteUsersStore.contactList,
  customNotificationPermission: state.permissionsStore.notificationPermissionsGranted
})

const mapDispatchToProps = dispatch => {
  const { logoutUser } = AuthStoreActions
  const { fbUserInfo } = UserStoreActions
  const {
    setGeoPermission,
    setNativeContactsPermission,
    setNotifPermission,
    setLocationInterval
  } = PermissionsStoreActions

  return {
    ...bindActionCreators({
      logoutUser,
      fbUserInfo,
      loginByFacebook,
      setLocationInterval,
      setGeoPermission,
      setNotifPermission,
      setNativeContactsPermission,
      storeContactInfo
    }, dispatch)
  }
}

export default navigationAware(connect(mapStateToProps, mapDispatchToProps)(LinearGradientWrapper(LaunchScreen)))
