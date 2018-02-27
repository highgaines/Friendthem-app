import React, { Component } from 'react'

import { ScrollView, View, TouchableOpacity, Text, Button, ActivityIndicator } from 'react-native'

// Components
import NearbyFeedCard from './NearbyFeedCard'

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
    const { nearbyUsers } = this.props
    return nearbyUsers.map( (user, idx) =>
      <NearbyFeedCard key={idx} friendData={user}/>)
  }

  render = () => {
    const { loading } = this.props

    return(
      <LazyloadScrollView contentContainerStyle={styles.nearbyFeedContainer}>
        {this.renderFeedCards()}
      </LazyloadScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.socialFeed.fetching,
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
