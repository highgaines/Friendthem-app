import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../Styles/NavbarStyles';

class Navbar extends Component {
  constructor(){
    super()

    this.state = {

    }
  }

  goToNearbyUsers = () => {
    const { navigation, users, setFriendInfo } = this.props
    navigation.navigate('NearbyUsersScreen', { users: users, navigation: navigations, setFriendInfo: setFriendInfo, numUsers: users.length })
  }

  goToNotifications = () => {
    console.log('navigating to notifications screen')
  }

  goToSettings = () => {
    console.log('navigating to settings')
  }

  handleLogout = () => {

  }

  render() {
    return(
        <View style={styles.navbarRow}>
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
      dispatch(FriendStoreActions.setFriendInfo(friendInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
