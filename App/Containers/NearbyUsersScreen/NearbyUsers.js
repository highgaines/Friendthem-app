import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'

// Components
import SearchBar from './SearchBar'
import UsersContainer from './UsersContainer'
import NearbyFeedContainer from './NearbyFeedContainer'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import Permissions from 'react-native-permissions'
import _ from 'lodash';

// Components
import Navbar from '../Navbar/Navbar'
import WelcomeScreen from '../TutorialScreens/WelcomeScreen'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PermissionsStoreActions from '../../Redux/PermissionsStore'
import FriendStoreActions from '../../Redux/FriendStore'
import InviteUsersStoreActions, { fetchConnectivityData } from '../../Redux/InviteUsersStore'
import UserStoreActions, { updateUserPosition } from '../../Redux/UserStore'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/NearbyUsersScreenStyles';

class NearbyUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      feedView: false,
      welcomeTutorialVisible: props.welcomeTutorialVisible
    }
  }

  componentWillMount = () => {
    const {
      accessToken,
      fetchConnectivityData,
      customGeolocationPermission,
      locationPermission,
      setLocationInterval
    } = this.props

    fetchConnectivityData(accessToken)
    if (customGeolocationPermission && !locationPermission) {
      Permissions.request('location', { type: 'whenInUse' }).then(response => {
        if(response === 'authorized') {
          setLocationInterval()
        }
      })
    }
  }


  locationInterval = () => {
    const { accessToken, updateUserPosition } = this.props
    navigator.geolocation.getCurrentPosition((position) => {
      updateUserPosition(accessToken, position.coords)
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  handleChange = input => {
    this.setState({input: input})
  }

  toggleNearbyFeed = () => {
    this.setState({ feedView: !this.state.feedView})
  }

  filterUsers = users => {
    const { input } = this.state
    return users.filter( user => user.first_name.includes(input) || user.last_name.includes(input) )
  }

  toggleWelcomeTutorial = () => {
    const { welcomeTutorialVisible } = this.state
    this.setState({ welcomeTutorialVisible: !welcomeTutorialVisible})
  }

  render() {
    const { users, navigation, setFriendInfo, locationPermission } = this.props
    const { input, feedView, welcomeTutorialVisible } = this.state

    return(
      <View
        testID={'nearby_users_container'} style={[styles.nearbyUsersContainer]}>
        <SearchBar
          numUsers={users.length}
          navigation={navigation}
          handleChange={this.handleChange}
          input={this.state.input}
          feedView={feedView}
          toggleNearbyFeed={this.toggleNearbyFeed}
        />
        {
          !feedView
          ? <UsersContainer
              users={input.length ? this.filterUsers(users) : users}
              navigation={navigation}
              locationPermission={locationPermission}
              setFriendInfo={setFriendInfo}
            />
          : <NearbyFeedContainer />
        }
        {
          welcomeTutorialVisible
          ? <WelcomeScreen
              visible={welcomeTutorialVisible}
              closeModal={this.toggleWelcomeTutorial}
              name='Peter Parker'
              navigation={navigation}
              toggleWelcomeTutorial={this.toggleWelcomeTutorial}
            />
          : null
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.authStore.accessToken,
  locationPermission: state.permissionsStore.nativeGeolocation,
  users: state.friendStore.users,
  customGeolocationPermission: state.permissionsStore.locationPermissionsGranted,
})

const mapDispatchToProps = dispatch => {
  const { setFriendInfo } = FriendStoreActions
  const { setLocationInterval } = PermissionsStoreActions

  return {
    ...bindActionCreators({
      updateUserPosition,
      setFriendInfo,
      fetchConnectivityData,
      setLocationInterval
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyUsers)
