import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Libraries
import SVGImage from 'react-native-svg-image';
import LinearGradient from 'react-native-linear-gradient';
import OneSignal from 'react-native-onesignal';
import Contacts from 'react-native-contacts';

// Components
import ConnectButton from '../SuperConnectScreen/ConnectButton';

// HOC
import LinearGradientWrapper from '../../HOCs/LinearGradientWrapper';

// Redux
import PermissionsStoreActions, { setGeoPermission } from '../../Redux/PermissionsStore';
import FriendStoreActions from '../../Redux/FriendStore'
import NotificationStoreActions, { registerForPushNotif } from '../../Redux/NotificationStore'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/PermissionsScreenStyles';

class PermissionScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deviceId: null
    }
  }

  // console logs for testing purposes
  componentWillMount = () => {
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('registered', this.onRegistered)
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('registered', this.onRegistered)
    OneSignal.removeEventListener('ids', this.onIds)
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
    console.log('Device Info:', device)
    registerForPushNotif(accessToken, device.userId)
  }

  handleNotNow = () => {
    // redux action to continue WITHOUT gelocation
    this.props.navigation.navigate('LaunchScreen')
  }

  handleOkay = () => {
    // redux action to continue WITH gelocation
    const {
      navigation,
      permissionType,
      storeContactInfo,
      grantLocationPermission,
      grantNotificationPermission
    } = this.props
    const { navigate } = navigation

    if (permissionType === 'geolocation') {
      grantLocationPermission(true)
      navigate('PermissionScreen', { permissionType: 'notifications', navigation: navigation })
    } else {
      grantNotificationPermission(true)
      navigate('ForkScreen', { navigation: navigation })
    }
  }

  determineText = () => {
    const { permissionType } = this.props

    return permissionType === 'geolocation' ?
    'See all the new cool people around you. Without access, Friendthem is no fun. Check your phone settings to make changes.' :
    'To let you know about recent activity and make sure you dont miss any connections! You can silence notifications in your settings.'
  }

  determineTitle = () => {
    const { permissionType } = this.props

    return permissionType === 'geolocation' ?
    'WE WOULD LIKE TO ACCESS YOUR LOCATION' :
    'WE WOULD ALSO LIKE TO SEND YOU NOTIFICATIONS'
  }

  determineImage = () => {
    const { permissionType } = this.props

    return permissionType === 'geolocation' ?
    Images.geolocationPNG : Images.notificationsSVG
  }

  render() {
    const { permissionType } = this.props

    return (
          <View style={styles.container}>
            <Text style={[styles.text, { fontSize: 18 }]}>
               {this.determineTitle()}
             </Text>
            <Text style={[styles.text, { fontSize: 14 }]}>
              {this.determineText()}
             </Text>
             <Image
               source={this.determineImage()}
               />
             <View testID={'button_container'} style={styles.buttonContainer}>
               <ConnectButton
                 testID={'connect_button_not_now'}
                 title="NOT NOW"
                 containerStyle={styles.button}
                 textStyle={styles.buttonTextStyle}
                 onPressCallback={() => this.handleNotNow()}
               />
              <View testID={'connect_button_okay'}>
                <ConnectButton
                  title="OKAY!"
                  containerStyle={styles.button}
                  textStyle={styles.buttonTextStyle}
                  onPressCallback={() => this.handleOkay()}
                />
              </View>
             </View>
          </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.authStore.accessToken
  }
}

const mapDispatchToProps = dispatch => {
  const {
    grantLocationPermission,
    grantNotificationPermission
   } = PermissionsStoreActions
  const { setFriendInfo } = FriendStoreActions

  return {
    ...bindActionCreators({
      setFriendInfo,
      grantLocationPermission,
      grantNotificationPermission,
      registerForPushNotif
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinearGradientWrapper(PermissionScreen))
