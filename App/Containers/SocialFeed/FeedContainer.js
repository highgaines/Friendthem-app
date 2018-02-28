import React, { Component } from 'react'

import { View, TouchableOpacity, Text, Button, ScrollView, ActivityIndicator, Linking } from 'react-native';

// Components
import FeedCard from './FeedCard';

// Libraries
import { Icon } from 'react-native-elements';
import Image from 'react-native-remote-svg';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialFeedStoreActions, { fetchFeed } from '../../Redux/SocialFeedStore'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedContainerStyles';

class FeedContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const {
      platform,
      fetchFeed,
      userId,
      accessToken
    } = this.props

    fetchFeed(accessToken, userId, platform)
  }

  componentDidUpdate = prevProps => {
    const {
      platform,
      fetchFeed,
      userId,
      accessToken
    } = this.props

    if (prevProps.platform !== platform) {
      fetchFeed(accessToken, userId, platform)
    }
  }

  renderFeedCards = platform => {
    const { userId, feed } = this.props
    const userFeedArr = feed[userId] && feed[userId][platform] ? feed[userId][platform] : []
    return userFeedArr.map( (item, idx) => <FeedCard key={idx} item={item}/>)
  }

  linkToProfile = url => {
    Linking.openURL(url)
  }

  render = () => {
    const { platform, loading, friendInfo } = this.props
    const isInstagram = platform === 'instagram'
    const instaUID = friendInfo.social_profiles.find(profile => profile.provider === 'instagram').uid
    const instaUrl = instaUID ? `https://www.instagram.com/eoghanl` : ''
    const capitalizedPlat = platform ? `${platform.split('')[0].toUpperCase()}${platform.split('').slice(1).join('')}` : ''

    return(
      <ScrollView contentContainerStyle={styles.feedContainer}>
        <Text style={styles.titleText}> {capitalizedPlat} Feed </Text>
        <TouchableOpacity style={styles.profileLinkButton}>
          <Text style={styles.buttonText} onPress={() => this.linkToProfile(instaUrl)}>View Full Profile</Text>
        </TouchableOpacity>
        { loading ?
          <View
            style={styles.loading, { marginTop: 40 }}>
            <ActivityIndicator
              size="large"
              color="#0000ff"
            />
          </View> : this.renderFeedCards(platform)}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.socialFeed.feed,
    accessToken: state.authStore.accessToken,
    loading: state.socialFeed.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ fetchFeed }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
