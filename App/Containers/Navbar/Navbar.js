import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

// Libraries
import { Icon } from 'react-native-elements'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

// Components
import LogoutModal from './LogoutModal'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FriendStoreActions from '../../Redux/FriendStore'
import UserStoreActions from '../../Redux/UserStore'
import FBStoreActions from '../../Redux/FBStore'
import AuthStoreActions from '../../Redux/AuthStore'

// Constants
import { NAVBAR_RENDER_OK } from '../../Utils/constants'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/NavbarStyles'

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
    const { logoutComplete, navigation } = this.props
    this.props.logoutUser()
    this.toggleModal()
    LoginManager.logOut()
    logoutComplete()
    navigation.navigate('LaunchScreen')
  }

  goToNearbyUsers = () => {
    const { navigate } = this.props.navigation

    if (!this.determineCurrentScreen('NearbyUsersScreen')){
      navigate('NearbyUsersScreen')
    }
  }

  // notifications or user profile screen?
  goToNotifications = () => {
    const { navigate } = this.props.navigation

    if (!this.determineCurrentScreen('NotificationsScreen')){
      navigate('NotificationsScreen')
    }
  }

  goToInviteUsers = () => {
    const { navigate } = this.props.navigation

    if (!this.determineCurrentScreen('InviteUsers')){
      navigate('InviteUsers')
    }
  }

  goToSettings = () => {
    const { navigate } = this.props.navigation

    if (!this.determineCurrentScreen('SettingsScreen')){
      navigate('SettingsScreen', { toggleModal: () => this.toggleModal() })
    }
  }

  goToProfile = () => {
    const { navigate } = this.props.navigation

    if (!this.determineCurrentScreen('UserProfileScreen')){
      navigate('UserProfileScreen')
    }
  }

  determineCurrentScreen = (comparison) => {
    const { reduxNav } = this.props
    const currentScreen = reduxNav.routes[reduxNav.routes.length - 1].routeName

    return currentScreen === comparison
  }

  render() {

    return(
        <View style={[this.props.navbarStyle || styles.navbarRow, { marginTop: this.props.margin }]}>
          <TouchableOpacity style={styles.button} onPress={this.goToProfile}>
            <View style={[styles.container, this.determineCurrentScreen('UserProfileScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='user'
                type='entypo'
                color={this.determineCurrentScreen('UserProfileScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentScreen('UserProfileScreen') ?
                {color: '#ff00e1'} :
                '' ]}> Profile </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToInviteUsers}>
            <View style={[styles.container, this.determineCurrentScreen('InviteUsers') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='users'
                type='entypo'
                color={this.determineCurrentScreen('InviteUsers') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentScreen('InviteUsers') ?
                {color: '#ff00e1'} :
                '' ]}> Friends </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToNearbyUsers}>
            <View
              style={[styles.container, this.determineCurrentScreen('NearbyUsersScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Image
                style={styles.peopleNearbyIcon}
                source={Images.peopleNearbyIcon}
                />
              <Text
                style={[styles.iconText, {top: 27, zIndex: 99}, this.determineCurrentScreen('NearbyUsersScreen') ?
                {color: '#ff00e1'} :
                '' ]}>
                People Nearby
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToNotifications}>
            <View style={[styles.container, this.determineCurrentScreen('NotificationsScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='notifications'
                type='materialicons'
                size={26}
                color={this.determineCurrentScreen('NotificationsScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentScreen('NotificationsScreen') ?
                {color: '#ff00e1'} :
                '' ]}> Notifications </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToSettings}>
            <View style={[styles.container, this.determineCurrentScreen('SettingsScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='settings'
                type='materialcommunityicons'
                size={27}
                color={this.determineCurrentScreen('SettingsScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentScreen('SettingsScreen') ?
                {color: '#ff00e1'} :
                '' ]}> Settings </Text>
              </View>
          </TouchableOpacity>
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
  reduxNav: state.nav
})

const mapDispatchToProps = dispatch => {
  const { fbUserInfo } = UserStoreActions
  const { setFriendInfo } = FriendStoreActions
  const { logoutComplete } = FBStoreActions
  const { logoutUser } = AuthStoreActions

  return {
    ...bindActionCreators({
      fbUserInfo,
      setFriendInfo,
      logoutComplete,
      logoutUser
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
