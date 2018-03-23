import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native'

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

// Utils
import { isIOS, isAndroid } from '../../Utils/constants'
import { RequestLocationPermission } from '../../Utils/functions'

class NearbyUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      feedView: false,
      welcomeTutorialVisible: !props.userSocialProfiles.length
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
      if (isIOS) {
        Permissions.request('location', { type: 'whenInUse' }).then(response => {
          if(response === 'authorized') {
            setLocationInterval()
          }
        })
      } else if (isAndroid) {
        RequestLocationPermission(setLocationInterval)
      }
    }
  }

  componentDidMount = () => {
    const { updateUserPosition, accessToken } = this.props
    if (accessToken) {
      navigator.geolocation.getCurrentPosition((position) => {
        updateUserPosition(accessToken, position.coords)
      },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
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
    const lowerCaseTrim = userName => userName.toLowerCase().includes(input.toLowerCase().trim())

    return users.filter( user => lowerCaseTrim(user.first_name) )
  }

  toggleWelcomeTutorial = () => {
    const { welcomeTutorialVisible } = this.state
    this.setState({ welcomeTutorialVisible: !welcomeTutorialVisible})
  }

  viewFriendProfile = userObj => {
    this.props.setFriendInfo(userObj);
    this.props.navigation.navigate('FriendProfileScreen', { });
  };

  render() {
    const { users, navigation, locationPermission, fetching } = this.props
    const { input, feedView, welcomeTutorialVisible } = this.state

    if (!feedView && fetching) {
      return(
        <View style={{ margin: '30%'}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

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
      { input.length && !this.filterUsers(users).length
          ? <View style={{alignSelf: 'center', top: 150}}>
            <Text>
              Sorry, no nearby users match your search!
            </Text>
          </View>
          : !feedView
            ? <UsersContainer
                users={input.length ? this.filterUsers(users) : users}
                navigation={navigation}
                locationPermission={locationPermission}
                viewFriendProfile={this.viewFriendProfile}
              />
            : <NearbyFeedContainer
              input={input}
              filterUsers={this.filterUsers}
              viewFriendProfile={this.viewFriendProfile}/>
        }
        {
          welcomeTutorialVisible
          ? <WelcomeScreen
              visible={welcomeTutorialVisible}
              closeModal={this.toggleWelcomeTutorial}
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
  userSocialProfiles: state.userStore.userData.social_profiles,
  fetching: state.inviteUsersStore.fetchingData
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
