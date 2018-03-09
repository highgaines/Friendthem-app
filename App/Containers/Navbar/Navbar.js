import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

// Libraries
import { Icon } from 'react-native-elements'
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import Analytics from 'analytics-react-native'

// Components
import LogoutModal from './LogoutModal'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FriendStoreActions from '../../Redux/FriendStore'
import UserStoreActions from '../../Redux/UserStore'
import FBStoreActions from '../../Redux/FBStore'
import AuthStoreActions from '../../Redux/AuthStore'

// Config
import envConfig from '../../../envConfig'
const analytics = new Analytics(envConfig.Development.SegmentAPIKey)

// Constants
import { NAVBAR_RENDER_OK } from '../../Utils/constants'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/NavbarStyles'
import { ifIphoneX } from '../../Themes/Helpers'

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
    const { logoutComplete, navigation, userStore } = this.props
    this.props.logoutUser()
    this.toggleModal()
    LoginManager.logOut()
    logoutComplete()
    analytics.track({
      userId: userStore.userId,
      event: 'User Log Out',
      properties: userStore.userData
    })
    navigation.navigate('LaunchScreen')
  }

  goToNearbyUsers = () => {
    const { navigate } = this.props.navigation

    if (!this.determineCurrentScreen('NearbyUsersScreen')){
      navigate('NearbyUsersScreen', { welcomeTutorialVisible: false })
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

  selectedStyleRender = screen => {
    return this.determineCurrentScreen(screen)
      ? ifIphoneX(styles.unselectedScreen, styles.selectedScreen)
      : styles.unselectedScreen
  }

  render() {
    const ipxNav = {'height': 70}
    const renderIpxNav = ifIphoneX(ipxNav, '')

    const ipxIcon = {'bottom': 20}
    const renderIpxIcon = ifIphoneX(ipxIcon, '')
    return(
        <View
          testID='navbar'
          style={[this.props.navbarStyle || styles.navbarRow, { marginTop: this.props.margin }, renderIpxNav]}>
          <TouchableOpacity
            testID='profile-navbar-button'
            style={styles.button} onPress={this.goToProfile}>
            <View style={[styles.container, this.selectedStyleRender('UserProfileScreen')]}>
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
            <View style={[styles.container, this.selectedStyleRender('InviteUsers')]}>
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
              style={[styles.container, this.selectedStyleRender('NearbyUsersScreen')]}>
              <Image
                style={[styles.peopleNearbyIcon, renderIpxIcon]}
                source={Images.peopleNearbyIcon}
                />
              <Text
                style={[styles.iconText, {top: 35, zIndex: 99}, this.determineCurrentScreen('NearbyUsersScreen') ?
                {color: '#ff00e1'} :
                '' ]}>
                Nearby
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID='notification-navbar-button'
            style={styles.button} onPress={this.goToNotifications}>
            <View style={[styles.container, this.selectedStyleRender('NotificationsScreen')]}>
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
          <TouchableOpacity
            testID='settings-navbar-button'
            style={styles.button} onPress={this.goToSettings}>
            <View style={[styles.container, this.selectedStyleRender('SettingsScreen')]}>
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
  reduxNav: state.nav,
  userStore: state.userStore
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
