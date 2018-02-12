import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

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
import { NAVBAR_RENDER_OK } from '../../Utils/constants';

// Images
import { Images } from '../../Themes';

// Styles
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
    const { logoutComplete, navigation } = this.props
    this.props.logoutUser()
    this.toggleModal()
    LoginManager.logOut();
    logoutComplete()
    navigation.navigate('LaunchScreen')
  }

  goToNearbyUsers = () => {
    const { navigation, users, setFriendInfo } = this.props
    const { navigate } = this.props.navigation

    navigate('NearbyUsersScreen', { navigation: navigation })
  }

  // notifications or user profile screen?
  goToNotifications = () => {
    const { navigate } = this.props.navigation
    navigate('NotificationsScreen', { navigation: this.props.navigation })
  }

  goToInviteUsers = () => {
    const { navigate } = this.props.navigation
    navigate('InviteUsers', { navigation: this.props.navigation })
  }

  goToSettings = () => {
    const { navigate } = this.props.navigation
    navigate('SettingsScreen', { toggleModal: () => this.toggleModal() })
  }

  goToProfile = () => {
    const { navigate } = this.props.navigation
    navigate('UserProfileScreen')
  }

  determineCurrentPage = (buttonName) => {
    const { nav } = this.props
    const currentPage = nav.routes[nav.routes.length - 1].routeName

    return currentPage === buttonName
  }

  render() {

    return(
        <View style={[this.props.navbarStyle || styles.navbarRow, { marginTop: this.props.margin }]}>
          <TouchableOpacity style={styles.button} onPress={this.goToProfile}>
            <View style={[styles.container, this.determineCurrentPage('UserProfileScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='user'
                type='entypo'
                color={this.determineCurrentPage('UserProfileScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentPage('UserProfileScreen') ?
                {color: '#ff00e1'} :
                '' ]}> Profile </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToInviteUsers}>
            <View style={[styles.container, this.determineCurrentPage('InviteUsers') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='users'
                type='entypo'
                color={this.determineCurrentPage('InviteUsers') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentPage('InviteUsers') ?
                {color: '#ff00e1'} :
                '' ]}> Friends </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToNearbyUsers}>
            <View
              style={[styles.container, this.determineCurrentPage('NearbyUsersScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name="500px-with-circle"
                type="entypo"
                color={this.determineCurrentPage('NearbyUsersScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text
                style={[styles.iconText, this.determineCurrentPage('NearbyUsersScreen') ?
                {color: '#ff00e1'} :
                '' ]}>
                Nearby
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToNotifications}>
            <View style={[styles.container, this.determineCurrentPage('NotificationsScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='notifications'
                type='materialicons'
                size={26}
                color={this.determineCurrentPage('NotificationsScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentPage('NotificationsScreen') ?
                {color: '#ff00e1'} :
                '' ]}> Notifications </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToSettings}>
            <View style={[styles.container, this.determineCurrentPage('SettingsScreen') ?
              {
                borderColor: '#ff00e1',
                borderBottomWidth: 2
              }: '']}>
              <Icon
                name='settings'
                type='materialcommunityicons'
                size={27}
                color={this.determineCurrentPage('SettingsScreen') ? "#ff00e1" : "#fff"}
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.iconText, this.determineCurrentPage('SettingsScreen') ?
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
  nav: state.nav
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
