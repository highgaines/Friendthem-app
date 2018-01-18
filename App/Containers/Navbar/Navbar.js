import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

import LogoutModal from './LogoutModal';
import FriendStoreActions from '../../Redux/FriendStore'
import UserStoreActions from '../../Redux/UserStore';
import FBStoreActions from '../../Redux/FBStore';

// Icons
import { Images } from '../../Themes';

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
    const { navigate } = this.props.navigation

    navigate('NearbyUsersScreen',
    {
      users: users,
      navigation: navigation,
      setFriendInfo: setFriendInfo,
      numUsers: users.length
    })
  }

  // notifications or user profile screen?
  goToNotifications = () => {
    const { navigate } = this.props.navigation
    navigate('NotificationsScreen',
    {
      navigation: this.props.navigation
    })
  }

  goToInviteUsers = () => {
    const { navigate } = this.props.navigation
    navigate('InviteUsers',
    {
        // pass in props object here
    })
  }

  goToSettings = () => {
    const { navigate } = this.props.navigation
    navigate('SettingsScreen',
      {
        toggleModal: () => this.toggleModal()
      })
  }

  goToProfile = () => {
    const { navigate } = this.props.navigation
    navigate('UserProfileScreen',
    {
        // pass in props object here
    })
  }

  render() {
    return(
        <View style={[this.props.navbarStyle || styles.navbarRow, { marginTop: this.props.margin }]}>

          <Icon
            name='user'
            type='entypo'
            color='#fff'
            containerStyle={styles.iconContainer}
            onPress={this.goToProfile}
          />
          <Icon
            name='users'
            type='entypo'
            color='#fff'
            containerStyle={styles.iconContainer}
            onPress={this.goToInviteUsers}
          />
          <Icon
            name="500px-with-circle"
            type="entypo"
            color="#fff"
            containerStyle={styles.iconContainer}
            onPress={this.goToNearbyUsers}
          />
          <Icon
            name='notifications'
            type='materialicons'
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
