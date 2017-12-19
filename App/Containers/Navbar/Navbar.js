import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

import FriendStoreActions from '../../Redux/FriendStore'
import UserStoreActions from '../../Redux/UserStore';
import FBStoreActions from '../../Redux/FBStore';

import styles from '../Styles/NavbarStyles';

class Navbar extends Component {
  constructor(){
    super()

    this.state = {
      highlighted: ''
    }
  }

  goToNearbyUsers = () => {
    const { navigation, users, setFriendInfo } = this.props
    navigation.navigate('NearbyUsersScreen',
    {
      users: users,
      navigation: navigation,
      setFriendInfo: setFriendInfo,
      numUsers: users.length
    })
  }

  goToNotifications = () => {
    console.log('navigating to notifications screen')
  }

  goToSettings = () => {
    console.log('navigating to settings')
  }

  handleLogout = () => {
    const { fbLogoutComplete, navigation } = this.props
    LoginManager.logOut();
    alert('Logging out of FriendThem...')
    fbLogoutComplete()
    navigation.navigate('LaunchScreen')
  }

  render() {
    return(
        <View style={this.props.navbarStyle || styles.navbarRow}>
          <Icon
            name='users'
            type='entypo'
            color='#fff'
            onPress={this.goToNearbyUsers}
          />
          <Icon
            name='bell-o'
            type='font-awesome'
            color='#fff'
            onPress={this.goToNotifications}
          />
          <Icon
            name='settings'
            type='materialcommunityicons'
            color='#fff'
            onPress={this.goToSettings}
          />
          <Icon
            name='log-out'
            type='entypo'
            color='#fff'
            onPress={this.handleLogout}
          />
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userFbData,
  users: state.facebook.users
})

const mapDispatchToProps = dispatch => {
  return {
    userInfoRequestSuccess: (userInfo) =>
      dispatch(UserStoreActions.fbUserInfo(userInfo)),
    setFriendInfo: (friendInfo) =>
      dispatch(FriendStoreActions.setFriendInfo(friendInfo)),
    fbLogoutComplete: () => dispatch(FBStoreActions.logoutComplete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
