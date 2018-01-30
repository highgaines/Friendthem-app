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

  render() {
    const { current } = this.props

    return(
        <View style={[this.props.navbarStyle || styles.navbarRow, { marginTop: this.props.margin }]}>
          <TouchableOpacity style={styles.button} onPress={this.goToProfile}>
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
              />
              <Text style={[styles.iconText, current === 'Profile' ?
                {color: '#ff00e1'} :
                '' ]}> Profile </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToInviteUsers}>
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
              />
              <Text style={[styles.iconText, current === 'Friends' ?
                {color: '#ff00e1'} :
                '' ]}> Friends </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToNearbyUsers}>
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
              />
              <Text
                style={[styles.iconText, current === 'Nearby' ?
                {color: '#ff00e1'} :
                '' ]}>
                Nearby
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToNotifications}>
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
              />
              <Text style={[styles.iconText, current === 'Notifications' ?
                {color: '#ff00e1'} :
                '' ]}> Notifications </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.goToSettings}>
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
              />
              <Text style={[styles.iconText, current === 'Settings' ?
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
  // access redux state for navbar
})

const mapDispatchToProps = dispatch => {
  const { fbUserInfo } = UserStoreActions
  const { setFriendInfo } = FriendStoreActions
  const { fbLogoutComplete } = FBStoreActions
  const { logoutUser } = AuthStoreActions

  return {
    ...bindActionCreators({
      fbUserInfo,
      setFriendInfo,
      fbLogoutComplete,
      logoutUser
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
