import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

import LogoutModal from './LogoutModal';
import FriendStoreActions from '../../Redux/FriendStore'
import UserStoreActions from '../../Redux/UserStore';
import FBStoreActions from '../../Redux/FBStore';

import styles from '../Styles/NavbarStyles';

class Navbar extends Component {
  constructor(){
    super()

    this.state = {
      highlighted: '',
      logoutModalOpen: false
    }
  }

  toggleModal = () => {
    this.setState({ logoutModalOpen: !this.state.logoutModalOpen })
  }

  logOut = () => {
    const { fbLogoutComplete, navigation } = this.props

    this.toggleModal()
    LoginManager.logOut();
    fbLogoutComplete()
    navigation.navigate('LaunchScreen')
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
    this.props.navigation.navigate('UserProfileScreen')
  }

  goToSettings = () => {
    console.log('navigating to settings')
  }

  render() {
    return(
        <View style={this.props.navbarStyle || styles.navbarRow}>
          <Icon
            name='users'
            type='entypo'
            color='#fff'
            containerStyle={styles.iconContainer}
            onPress={this.goToNearbyUsers}
          />
          <Icon
            name='bell-o'
            type='font-awesome'
            color='#fff'
            containerStyle={styles.iconContainer}
            onPress={this.goToNotifications}
          />
          <Icon
            name='settings'
            type='materialcommunityicons'
            color='#fff'
            containerStyle={styles.iconContainer}
            onPress={this.goToSettings}
          />
          <Icon
            name='log-out'
            type='entypo'
            color='#fff'
            containerStyle={styles.iconContainer}
            onPress={this.toggleModal}
          />
          <LogoutModal
            showModal={this.state.logoutModalOpen}
            logOut={this.logOut}
            toggleModal={this.toggleModal}
            modalStyle={styles.modal}
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
