import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

import LogoutModal from './LogoutModal'
import FriendStoreActions from '../../Redux/FriendStore'
import UserStoreActions from '../../Redux/UserStore'
import FBStoreActions from '../../Redux/FBStore'
import AuthStoreActions from '../../Redux/AuthStore'

// Icons
import { Images } from '../../Themes';

import styles from '../Styles/NavbarStyles';

class Navbar extends Component {
  constructor(props){
    super(props)

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
    this.props.logoutUser()
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
        navigation: this.props.navigation
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
    const { current } = this.props

    return(
        <View style={[this.props.navbarStyle || styles.navbarRow, { marginTop: this.props.margin }]}>
          <View style={[styles.container, current === 'Profile' ?
            {
              borderColor: '#ff00e1',
              borderBottomWidth: 2
            }: '']}>
            <Icon
              name='user'
              type='entypo'
              color={current === 'Profile' ? "#ff00e1" : "#fff"}
              containerStyle={styles.iconContainer}
              onPress={this.goToProfile}
            />
            <Text style={[styles.iconText, current === 'Profile' ?
              {color: '#ff00e1'} :
              '' ]}> Profile </Text>
          </View>

          <View style={[styles.container, current === 'Friends' ?
            {
              borderColor: '#ff00e1',
              borderBottomWidth: 2
            }: '']}>
            <Icon
              name='users'
              type='entypo'
              color={current === 'Friends' ? "#ff00e1" : "#fff"}
              containerStyle={styles.iconContainer}
              onPress={this.goToInviteUsers}
            />
            <Text style={[styles.iconText, current === 'Friends' ?
              {color: '#ff00e1'} :
              '' ]}> Friends </Text>
          </View>

          <View
            style={[styles.container, current === 'Nearby' ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
            <Icon
              name="500px-with-circle"
              type="entypo"
              color={current === 'Nearby' ? "#ff00e1" : "#fff"}
              containerStyle={styles.iconContainer}
              onPress={this.goToNearbyUsers}
            />
            <Text
              style={[styles.iconText, current === 'Nearby' ?
                {color: '#ff00e1'} :
                '' ]}>
              Nearby
            </Text>
          </View>

          <View style={[styles.container, current === 'Notifications' ?
            {
              borderColor: '#ff00e1',
              borderBottomWidth: 5
            }: '']}>
            <Icon
              name='notifications'
              type='materialicons'
              size={26}
              color={current === 'Notifications' ? "#ff00e1" : "#fff"}
              containerStyle={styles.iconContainer}
              onPress={this.goToNotifications}
            />
            <Text style={[styles.iconText, current === 'Notifications' ?
              {color: '#ff00e1'} :
              '' ]}> Notifications </Text>
          </View>

          <View style={[styles.container, current === 'Settings' ?
            {
              borderColor: '#ff00e1',
              borderBottomWidth: 2
            }: '']}>
            <Icon
              name='settings'
              type='materialcommunityicons'
              size={27}
              color={current === 'Settings' ? "#ff00e1" : "#fff"}
              containerStyle={styles.iconContainer}
              onPress={this.goToSettings}
            />
            <Text style={[styles.iconText, current === 'Settings' ?
              {color: '#ff00e1'} :
              '' ]}> Settings </Text>
          </View>
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
  userInfo: state.userStore.userData,
  users: state.facebook.users
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      userInfoRequestSuccess: (userInfo) =>
        dispatch(UserStoreActions.fbUserInfo(userInfo)),
      setFriendInfo: (friendInfo) =>
        dispatch(FriendStoreActions.setFriendInfo(friendInfo)),
      fbLogoutComplete: () => dispatch(FBStoreActions.logoutComplete()),
      logoutUser: () => dispatch(AuthStoreActions.logoutUser())
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
