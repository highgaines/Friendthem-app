import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import NearbyUsers from '../Containers/NearbyUsersScreen/NearbyUsers'
import SearchBar from '../Containers/NearbyUsersScreen/SearchBar'
import UserProfileScreen from '../Containers/ProfileScreen/UserProfileScreen';
import FriendProfileScreen from '../Containers/ProfileScreen/FriendProfileScreen';
import SuperConnect from '../Containers/SuperConnectScreen/SuperConnect';
import CongratulatoryScreen from '../Containers/SuperConnectScreen/CongratulatoryScreen';
import ForkScreen from '../Containers/SignUpFork/ForkScreen';
<<<<<<< HEAD
import UserProfileInfoScreen from '../Containers/ProfileScreen/UserProfileInfoScreen';
import EditProfileInfoScreen from '../Containers/ProfileScreen/EditProfileInfoScreen';
import NotificationsContainer from '../Containers/Notifications/NotificationsContainer';
=======
import UserProfileInfoScreen from '../Containers/ProfileScreen/UserProfileInfoScreen'
import EditProfileInfoScreen from '../Containers/ProfileScreen/EditProfileInfoScreen'
import LoginScreen from '../Containers/LoginScreen'
>>>>>>> init commit for updated login screen

import styles from './Styles/NavigationStyles'

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}
// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  ForkScreen: { screen:
    mapNavigationStateParamsToProps(ForkScreen) },
  NearbyUsersScreen: { screen:
    mapNavigationStateParamsToProps(NearbyUsers) },
  SearchBar: { screen: SearchBar },
  UserProfileScreen: { screen: UserProfileScreen },
  FriendProfileScreen: { screen:
    mapNavigationStateParamsToProps(FriendProfileScreen)
  },
  SuperConnectScreen: { screen:
    mapNavigationStateParamsToProps(SuperConnect) },
  CongratulatoryScreen: { screen:
    mapNavigationStateParamsToProps(CongratulatoryScreen) },
  UserProfileInfoScreen: {
    screen: mapNavigationStateParamsToProps(UserProfileInfoScreen)
  },
  EditProfileInfoScreen: {
    screen: mapNavigationStateParamsToProps(EditProfileInfoScreen)
  },
  NotificationsScreen: {
    screen: mapNavigationStateParamsToProps(NotificationsContainer)
  },
  LoginScreen: {
    screen: mapNavigationStateParamsToProps(LoginScreen)
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
