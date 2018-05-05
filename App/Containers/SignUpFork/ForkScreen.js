import React, { Component } from 'react';
import { Text, View, TouchableOpacity,
        Image, PermissionsAndroid, Platform } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PermissionsStoreActions from '../../Redux/PermissionsStore'
import UserStoreActions, { updateUserPosition, getUserInfo } from '../../Redux/UserStore'
import { storeContactInfo } from '../../Redux/InviteUsersStore'

// Components
import ConnectButton from '../SuperConnectScreen/ConnectButton'

// HOC
import LinearGradientWrapper from '../../HOCs/LinearGradientWrapper'

// Libraries
import { CachedImage } from "react-native-img-cache";
import { SocialIcon } from 'react-native-elements'
import Permissions from 'react-native-permissions'
import { Icon } from 'react-native-elements'
import OneSignal from 'react-native-onesignal';
import Contacts from 'react-native-contacts';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/ForkScreenStyles';
import { determineImage, isIOS } from '../../Utils/constants'

// Utils
import { RequestContactsPermission } from '../../Utils/functions'

class ForkScreen extends Component {

  componentDidMount = () => {
    const {
      nativeNotifications,
      customNotificationPermission,
      getUserInfo,
      storeContactInfo,
      accessToken,
      setNativeContactsPermission
    } = this.props
    if (accessToken) {
      getUserInfo(accessToken);
    }

    if (Platform.OS === 'ios') {
      Contacts.getAll( (err, contacts) => {
        if (err === 'denied') {
          console.log('DENIED')
        } else {
          storeContactInfo(contacts)
        }
        if (customNotificationPermission && !nativeNotifications) {
          OneSignal.registerForPushNotifications()
        }
      })
    } else {
      // get dangerous permissions for contacts on Android
      RequestContactsPermission(
          storeContactInfo,
          customNotificationPermission,
          nativeNotifications,
          setNativeContactsPermission
      )
    }

  }

  componentWillUpdate = (nextProps, nextState) => {
    const { locationIntervalRunning, getUserInfo } = this.props

    if (!locationIntervalRunning && nextProps.locationIntervalRunning) {
      this.locationInterval()
      setInterval(this.locationInterval, 18000000)
    }
    if (locationIntervalRunning && !nextProps.locationIntervalRunning) {
      clearInterval(this.locationInterval)
    }
    if (!this.props.accessToken && nextProps.accessToken) {
      getUserInfo(nextProps.accessToken)
    }
  }


  locationInterval = () => {
    const { accessToken, updateUserPosition } = this.props

    navigator.geolocation.getCurrentPosition((position) => {
      updateUserPosition(accessToken, position.coords)
    },
      (error) => this.setState({ error: error.message }),
      {enableHighAccuracy: isIOS, timeout: 10000 }
    )
  }

  directToUserProfile = () => {
    const { users, navigation, setFriendInfo, userInfo } = this.props

    navigation.navigate('UserProfileScreen', { navigation: navigation })
  }

  onReceived = (notification) => {
    console.log("Notification Received!", notification)
  }

  onOpened = openResult => {
    console.log('Message:', openResult.notification.payload.body)
    console.log('Data:', openResult.notification.payload.additionalData)
    console.log('isActive:', openResult.notification.isAppInFocus)
    console.log('openResult:', openResult)
  }

  onRegistered = notifData => {
    console.log("Device had been registered for push notifications!", notifData)
  }

  onIds = device => {
    const { accessToken, registerForPushNotif } = this.props
    if (accessToken) {
      registerForPushNotif(accessToken, device.userId)
    }
  }

  render() {
    const { navigate, userInfo } = this.props

    return (
            <View style={styles.centered}>
              <CachedImage
                style={{ marginTop: 100 }} source={Images.mainLogo}
              />
              {
                userInfo.picture ?
                <Image
                  style={styles.userImageContainer}
                  resizeMethod='scale'
                  source={userInfo.picture ? {uri: `${userInfo.picture}`} : Images.noPicSVG}
                />
                :
                <Icon
                  containerStyle={styles.userImageContainer}
                  name='ios-person'
                  type='ionicon'
                  size={115}
                  color='#000' />
              }
              <Text style={styles.primSubText}>
                Welcome!
              </Text>
              <Text style={styles.secSubText}>
                What would you like to do?
              </Text>
              <View testID={'go_to_nearby_users'}>
                <ConnectButton
                  color='#fff'
                  title='GO TO MY PROFILE'
                  containerStyle={styles.button}
                  textStyle={styles.buttonTextStyle}
                  onPressCallback={this.directToUserProfile}
                />
              </View>
            </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userData,
  fbAuthToken: state.fbStore.fbAccessToken,
  accessToken: state.authStore.accessToken,
  nativeNotifications: state.permissionsStore.nativeNotifications,
  locationIntervalRunning: state.permissionsStore.locationIntervalRunning,
  customNotificationPermission: state.permissionsStore.notificationPermissionsGranted,
  nativeContactsPermission: state.permissionsStore.nativeContactsPermission
})

const mapDispatchToProps = dispatch => {
  const { setNativeContactsPermission } = PermissionsStoreActions
  return {
    ...bindActionCreators({
      getUserInfo,
      setNativeContactsPermission,
      storeContactInfo,
      updateUserPosition
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinearGradientWrapper(ForkScreen, styles.linearGradient))
