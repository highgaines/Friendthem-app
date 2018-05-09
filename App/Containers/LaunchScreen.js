import React, { Component } from 'react'
import { ScrollView, Text, Image, View,
         TouchableOpacity, Button,
         ActivityIndicator, BackHandler } from 'react-native'

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
import * as Animatable from 'react-native-animatable'
import { CachedImage } from "react-native-img-cache"

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
import { isIOS, isAndroid, isIpad, IOS_PERMISSIONS, ANDROID_PERMISSIONS } from '../Utils/constants'
import { RequestContactsPermission, RequestLocationPermission } from '../Utils/functions'
import OneSignal from 'react-native-onesignal';

class LaunchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      loading: false,
      error: null,
    }
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackButtonPress);

    this.checkPermissions()

    if (this.props.loggedIn && this.props.nav.routes.length <= 2) {
      this.props.navigation.navigate('NearbyUsersScreen')
    }
  }

  shouldComponentUpdate = () => {
    const { nav } = this.props
    const routeLength = nav.routes.length
    const topLevelRoute = nav.routes[routeLength - 1].routeName

    return topLevelRoute === 'LaunchScreen'
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { fbAuthToken, navigation, nativeGeolocation, nativeNotifications, nativeContactsPermission, routeName, nav } = this.props
    const { permissionTypes } = this.state
    const routeLength = nav.routes.length
    const topLevelRoute = nav.routes[routeLength - 1].routeName

    if (!fbAuthToken && nextProps.fbAuthToken && this.state.loading) {
      this.getFbProfile(nextProps.fbAuthToken)
      this.handleLoadingComplete()
    }

    if (topLevelRoute === 'InviteUsers') {
      return
    } else if (nextProps.loggedIn && nextProps.routeName === 'LaunchScreen' && routeName !== 'PermissionScreen') {
      if (!nativeGeolocation) {
          nextProps.navigation.navigate('PermissionScreen', {
              permissionType: 'geolocation',
              navigation: navigation
            })
      } else if (!nativeNotifications && isIOS) {
          nextProps.navigation.navigate('PermissionScreen', {
            permissionType: 'notifications',
            navigation: navigation
          })
      } else {
          nextProps.navigation.navigate('NearbyUsersScreen')
      }
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
    const osPermissionTypes = isIOS ? IOS_PERMISSIONS : ANDROID_PERMISSIONS

    Permissions.checkMultiple(osPermissionTypes).then(response => {
      if (response.location === 'authorized') {
        setGeoPermission(true)
      }
      if (response.notification === 'authorized' || !isIOS) {
        setNotifPermission(true)
      }
      if (response.contacts === 'authorized') {
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
    const { fbUserInfo, navigation, loginByFacebook, nativeGeolocation, nativeNotifications, routeName, loggedIn } = this.props
    const { permissionTypes } = this.state
    const isLaunchScreen = routeName === 'LaunchScreen'

    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
        return error
      } else {
        fbUserInfo(result)
        if (loggedIn) {
          if (!nativeGeolocation && isLaunchScreen) {
              navigation.navigate('PermissionScreen', {
                  permissionType: 'geolocation',
                  navigation: navigation
                })
          } else if (!nativeNotifications && isLaunchScreen && isIOS) {
              navigation.navigate('PermissionScreen', {
                permissionType: 'notifications',
                navigation: navigation
              })
          } else if (isLaunchScreen) {
              navigation.navigate('NearbyUsersScreen')
          }
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

  handleAndroidBackButtonPress = () => {
    const { routes, navigation } = this.props

    if (routes && routes.length > 2) {
      navigation.pop(1);
      return true;
    } else {
      return false;
    }
  }

  render () {
    const { navigate } = this.props.navigation
    const { users, fbAuthToken, logoutUser, fbLoginComplete } = this.props
    const { loading } = this.state

    return (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Animatable.View
                animation="bounceIn"
                duration={3000}
                delay={500}
                >
                <CachedImage
                  style={ifIphoneX({ marginTop: 200 }, { marginTop: 100})}
                  source={Images.mainLogo}
                />
              </Animatable.View>
              <Text style={styles.primSubText}>
                CONNECTING THE WORLD
              </Text>
              <Text
                testID={'catch_phrase'} style={styles.secSubText}>
                Life Happens when people connect
              </Text>
            </View>
            <View style={isIpad ? styles.section : ''}>
              {loading
                ? (
                  <View style={styles.loading, { marginTop: 40 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                  )
                :
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                  <FBLogin
                    loggedIn={!!fbAuthToken}
                    handleLoading={this.handleLoading}
                    handleLoadingComplete={this.handleLoadingComplete}
                    checkPermissions={this.checkPermissions}
                  />
                  <ConnectButton
                    title='Start With Email'
                    color='#fff'
                    name='email-outline'
                    type='material-community'
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
  nativeContactsPermission: state.permissionsStore.nativeContactsPermission,
  contactList: state.inviteUsersStore.contactList,
  customNotificationPermission: state.permissionsStore.notificationPermissionsGranted,
  routes: state.nav.routes
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
