import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Permissions from 'react-native-permissions'
import ConnectButton from '../SuperConnectScreen/ConnectButton';

import PermissionsStoreActions from '../../Redux/PermissionsStore'
import UserStoreActions, { updateUserPosition } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/ForkScreenStyles';

//Images
import { Images } from '../../Themes';

class ForkScreen extends Component {

  componentDidMount = () => {
    const {
      nativeGeolocation,
      setLocationInterval,
      nativeNotifications,
      locationIntervalRunning,
      customGeolocationPermission,
      customNotificationPermission,
    } = this.props

    if (customGeolocationPermission && !nativeGeolocation) {
      Permissions.request('location', { type: 'always' }).then(response => {
        if(response === 'authorized') {
          setLocationInterval()
        }
      })
    }
    if (customNotificationPermission && !nativeNotifications) {
      Permissions.request('notification').then(response => {
        this.setState({ permissionsGranted: true })
      })
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { locationIntervalRunning } = this.props

    if (!locationIntervalRunning && nextProps.locationIntervalRunning) {
      this.locationInterval()
      setInterval(this.locationInterval, 18000000)
    }
    if (locationIntervalRunning && !nextProps.locationIntervalRunning) {
      clearInterval(this.locationInterval)
    }
  }

  locationInterval = () => {
    const { apiAccessToken, updateUserPosition } = this.props

    navigator.geolocation.getCurrentPosition((position) => {
      updateUserPosition(apiAccessToken, position.coords)
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  directToNearbyUsers = () => {
    const { navigate } = this.props.navigation
    const { users, navigation, setFriendInfo } = this.props

    navigate('NearbyUsersScreen', { navigation: navigation })
  }

  render() {
    const { navigate, userInfo } = this.props
    const { picture } = userInfo
    const imageSource = picture ? picture : Images.noPicSVG

    return (
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
            style={styles.linearGradient}
          >
            <View style={styles.centered}>
              <Image
                style={{ marginTop: 100 }} source={{uri: `${Images.mainLogo}`}}
              />
              <Image
                style={styles.userImage} source={{uri: `${imageSource}`}}
              />
              <View>
                <SocialIcon
                  raised={false}
                  iconSize={15}
                  type='facebook'
                  iconStyle={{
                    backgroundColor: 'transparent'
                  }}
                />
              </View>
              <Text style={styles.primSubText}>
                {`Welcome ${userInfo.name}` }
              </Text>
              <Text style={styles.secSubText}>
                What would you like to do?
              </Text>
              <ConnectButton
                color='#fff'
                title='FIND PEOPLE NEARBY'
                containerStyle={styles.button}
                textStyle={styles.buttonTextStyle}
                onPressCallback={this.directToNearbyUsers}
              />
            </View>
          </LinearGradient>
        </View>

    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userData,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  nativeGeolocation: state.permissionsStore.nativeGeolocation,
  nativeNotifications: state.permissionsStore.nativeNotifications,
  locationIntervalRunning: state.permissionsStore.locationIntervalRunning,
  customGeolocationPermission: state.permissionsStore.locationPermissionsGranted,
  customNotificationPermission: state.permissionsStore.notificationPermissionsGranted,
})

const mapDispatchToProps = dispatch => {
  const { setLocationInterval } = PermissionsStoreActions

  return {
    ...bindActionCreators({
      setLocationInterval,
      updateUserPosition
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForkScreen)
