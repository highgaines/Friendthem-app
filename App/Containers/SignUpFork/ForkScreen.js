import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

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
import { SocialIcon } from 'react-native-elements'
import Permissions from 'react-native-permissions'
import { Icon } from 'react-native-elements'
import OneSignal from 'react-native-onesignal';
import Contacts from 'react-native-contacts';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/ForkScreenStyles';
import { determineImage } from '../../Utils/constants'


class ForkScreen extends Component {

  componentDidMount = () => {
    const {
      nativeGeolocation,
      setLocationInterval,
      nativeNotifications,
      nativeContactsPermission,
      locationIntervalRunning,
      customGeolocationPermission,
      customNotificationPermission,
      getUserInfo,
      storeContactInfo,
      accessToken
    } = this.props

    if (accessToken) {
      getUserInfo(accessToken);
    }

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

    if (customGeolocationPermission && !nativeGeolocation) {
      Permissions.request('location', { type: 'always' }).then(response => {
        if(response === 'authorized') {
          setLocationInterval()
        }
      })
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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  directToNearbyUsers = () => {
    const { navigate } = this.props.navigation
    const { users, navigation, setFriendInfo } = this.props

    navigate('NearbyUsersScreen', { navigation: navigation, welcomeTutorialVisible: true })
  }

  render() {
    const { navigate, userInfo } = this.props

    return (
            <View style={styles.centered}>
              <Image
                style={{ marginTop: 100 }} source={Images.mainLogo}
              />
              {
                userInfo.picture ?
                <Image
                  style={styles.userImageContainer}
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
                  title='GO TO USER PROFILE'
                  containerStyle={styles.button}
                  textStyle={styles.buttonTextStyle}
                  onPressCallback={this.directToNearbyUsers}
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
  nativeGeolocation: state.permissionsStore.nativeGeolocation,
  nativeNotifications: state.permissionsStore.nativeNotifications,
  locationIntervalRunning: state.permissionsStore.locationIntervalRunning,
  customGeolocationPermission: state.permissionsStore.locationPermissionsGranted,
  customNotificationPermission: state.permissionsStore.notificationPermissionsGranted,
  nativeContactsPermission: state.permissionsStore.nativeContactsPermission
})

const mapDispatchToProps = dispatch => {
  const { setLocationInterval } = PermissionsStoreActions

  return {
    ...bindActionCreators({
      getUserInfo,
      setLocationInterval,
      storeContactInfo,
      updateUserPosition
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinearGradientWrapper(ForkScreen, styles.linearGradient))
