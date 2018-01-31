import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Libraries
import SVGImage from 'react-native-svg-image';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-remote-svg';

// Components
import ConnectButton from '../SuperConnectScreen/ConnectButton';

// Redux
import PermissionsStoreActions, { setGeoPermission } from '../../Redux/PermissionsStore';
import FriendStoreActions from '../../Redux/FriendStore'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/PermissionsScreenStyles';

class PermissionScreen extends Component {
  constructor(props) {
    super(props)
  }

  handleNotNow = () => {
    // redux action to continue WITHOUT gelocation
  }

  handleOkay = () => {
    // redux action to continue WITH gelocation
    const {
      navigation,
      permissionType,
      grantLocationPermission,
      grantNotificationPermission
    } = this.props
    const { navigate } = navigation

    if (permissionType === 'geolocation') {
      grantLocationPermission()
      navigate('PermissionScreen', { permissionType: 'notifications', navigation: navigation })
    } else {
      grantNotificationPermission()
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
    Images.geolocationSVG : Images.notificationsSVG
  }

  render() {
    const { permissionType } = this.props

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={{ flex: 1}}>
          <View style={styles.container}>
            <Text style={[styles.text, { fontSize: 18 }]}>
               {this.determineTitle()}
             </Text>
            <Image
              style={{ width: 220, height: 220 }}
              source={this.determineImage()}
            />
            <Text style={[styles.text, { fontSize: 14 }]}>
              {this.determineText()}
             </Text>
             <View style={styles.buttonContainer}>
               <ConnectButton
                 title="NOT NOW"
                 containerStyle={styles.button}
                 textStyle={styles.buttonTextStyle}
                 onPressCallback={() => this.handleNotNow()}
               />
               <ConnectButton
                 title="OKAY!"
                 containerStyle={styles.button}
                 textStyle={styles.buttonTextStyle}
                 onPressCallback={() => this.handleOkay()}
               />
             </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  // hook up state to props
})

const mapDispatchToProps = dispatch => {
  const {
    setGeoPermission,
    setNotifPermission,
    grantLocationPermission,
    grantNotificationPermission
   } = PermissionsStoreActions
  const { setFriendInfo } = FriendStoreActions

  return {
    ...bindActionCreators({
      setFriendInfo,
      setGeoPermission,
      setNotifPermission,
      grantLocationPermission,
      grantNotificationPermission
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionScreen)
