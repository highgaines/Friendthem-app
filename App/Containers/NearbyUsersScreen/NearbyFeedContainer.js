import React, { Component } from 'react'

import { ScrollView, View, TouchableOpacity, Text, Button, ActivityIndicator } from 'react-native'

// Components
import NearbyFeedCard from './NearbyFeedCard'
import NoPeopleNearby from './NoPeopleNearby'

// Libraries
import { Icon } from 'react-native-elements'
import Image from 'react-native-remote-svg'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SocialFeedStoreActions from '../../Redux/SocialFeedStore'
import UserStoreActions from '../../Redux/UserStore'
import InviteUsersStoreActions, { fetchConnectivityData } from '../../Redux/InviteUsersStore'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/FeedContainerStyles'

import { LazyloadScrollView } from 'react-native-lazyload-deux'

class NearbyFeedContainer extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    // action here to look for all nearby users
    const { fetchConnectivityData, accessToken } = this.props
    fetchConnectivityData(accessToken)
  }

  renderFeedCards = () => {
    // map over users and render cards
    const { nearbyUsers, viewFriendProfile, input, filterUsers } = this.props
    let filteredUsers = input.length ? nearbyUsers.filter(user => {
      return user.first_name.toLowerCase().includes(input.toLowerCase()) || user.last_name.toLowerCase().includes(input.toLowerCase())
    }) : nearbyUsers
    return filteredUsers.map( (user, idx) => {
      if(user.social_profiles && user.social_profiles.length > 1) {
        return(
          <NearbyFeedCard
            key={idx}
            friendData={user}
            setFriendInfo={() => viewFriendProfile(user)}
          />
        )
      }
    })
  }

  checkLocationPermission = () => {
    const { navigation, locationPermission, fetching, isActiveLocation } = this.props

    return isActiveLocation && locationPermission
    ? this.renderFeedCards()
    : <NoPeopleNearby
      locationPermission={locationPermission}
      isActiveLocation={isActiveLocation}
      navigation={navigation}
    />
  }

  render = () => {
    const { loading, nearbyUsers } = this.props

    return(
      <LazyloadScrollView contentContainerStyle={styles.nearbyFeedContainer}>
        {nearbyUsers.length || !loading
          ? this.checkLocationPermission()
          : <View style={{alignSelf: 'center', top: 100}}>
            <Text>
              There are no users nearby.
            </Text>
          </View> }
      </LazyloadScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.socialFeed.fetchingData,
    accessToken: state.authStore.accessToken,
    nearbyUsers: state.inviteUsersStore.connectivityData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchConnectivityData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyFeedContainer)
