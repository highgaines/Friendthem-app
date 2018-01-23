import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Permissions from 'react-native-permissions'
import ConnectButton from '../SuperConnectScreen/ConnectButton';

// Styles
import styles from '../Styles/ForkScreenStyles';

class ForkScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locationPermission: false,
      notificationPermission: false
    }
  }

  componentWillMount = () => {
    const { locationPermission, notificationPermission } = this.props

    if (locationPermission && notificationPermission) {
      Permissions.request('location', { type: 'active' }).then(response => {
        this.setState({ locationPermission: response })
      })
      Permissions.request('notification').then(response => {
        this.setState({ notificationPermission: response })
      })
    }
  }

  directToNearbyUsers = () => {
    const { navigate } = this.props.navigation
    const { users, navigation, setFriendInfo } = this.props
    navigate('NearbyUsersScreen',
    {
        users: users,
        navigation: navigation,
        setFriendInfo: setFriendInfo,
        numUsers: users.length
    })
  }

  directToBuildProfile = () => {
    this.props.navigation.navigate('RegisterUserScreen')
  }

  render() {
    const { navigate, userInfo } = this.props

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
                style={{ marginTop: 100 }} source={require('../../Images/logo.png')}
              />
              <Image
                style={styles.userImage} source={{uri: userInfo.picture.data.url}}
              />
              <View style={{ position: 'absolute', top: 260}}>
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
  locationPermission: state.permissionsStore.locationPermissionsGranted,
  notificationPermission: state.permissionsStore.notificationPermissionsGranted
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForkScreen)
