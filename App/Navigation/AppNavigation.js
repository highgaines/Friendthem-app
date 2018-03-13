import React, { Component } from 'react'
import { StackNavigator, NavigationActions } from 'react-navigation'

// Components
import LaunchScreen from '../Containers/LaunchScreen'
import NearbyUsers from '../Containers/NearbyUsersScreen/NearbyUsers'
import SearchBar from '../Containers/NearbyUsersScreen/SearchBar'
import UserProfileScreen from '../Containers/ProfileScreen/UserProfileScreen'
import FriendProfileScreen from '../Containers/ProfileScreen/FriendProfileScreen'
import SuperConnect from '../Containers/SuperConnectScreen/SuperConnect'
import CongratulatoryScreen from '../Containers/SuperConnectScreen/CongratulatoryScreen'
import ForkScreen from '../Containers/SignUpFork/ForkScreen'
import RegisterUserScreen from '../Containers/ProfileScreen/RegisterUserScreen'
import NotificationsContainer from '../Containers/Notifications/NotificationsContainer'
import SettingsScreen from '../Containers/Settings/SettingsScreen'
import LoginScreen from '../Containers/LoginScreen'
import InviteUsersScreen from '../Containers/InviteUsers/InviteUsersScreen'
import PermissionScreen from '../Containers/Permissions/PermissionScreen'

// Styles
import styles from './Styles/NavigationStyles'

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions  // better use hoist-non-react-statics
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
  RegisterUserScreen: {
    screen: mapNavigationStateParamsToProps(RegisterUserScreen)
  },
  NotificationsScreen: {
    screen: mapNavigationStateParamsToProps(NotificationsContainer)
  },
  SettingsScreen: {
    screen: mapNavigationStateParamsToProps(SettingsScreen)
  },
  LoginScreen: {
    screen: mapNavigationStateParamsToProps(LoginScreen)
  },
  InviteUsers: {
    screen: mapNavigationStateParamsToProps(InviteUsersScreen)
  },
  PermissionScreen: {
    screen: mapNavigationStateParamsToProps(PermissionScreen)
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header,
    gesturesEnabled: false
  }
})

const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;

  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName &&
    routeName !== 'PermissionScreen'
  ) ? null : getStateForAction(action, state);
};

PrimaryNav.router.getStateForAction = navigateOnce(PrimaryNav.router.getStateForAction)

export default PrimaryNav
