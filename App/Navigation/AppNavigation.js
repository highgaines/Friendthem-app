import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import NearbyUsers from '../Containers/NearbyUsersScreen/NearbyUsers'
import SearchBar from '../Containers/NearbyUsersScreen/SearchBar'
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
  NearbyUsersScreen: { screen: mapNavigationStateParamsToProps(NearbyUsers) },
  SearchBar: { screen: SearchBar }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
