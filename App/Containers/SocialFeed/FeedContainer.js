import React, { Component } from 'react'

import { View, TouchableOpacity, Text, Button, ScrollView, ActivityIndicator } from 'react-native';

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
    const { platform, fetchFeed, userId, accessToken } = this.props
    fetchFeed(accessToken, userId, platform)
  }

  renderFeedCards = platform => {
    this.props[`${platform}Feed`].map( item => {
      <FeedCard
        platform={item.provider}
        image={item.img_url}
        description={item.description}
        date={item.date_posted}
        numLikes={item.num_likes}
      />
    })
  }

  render = () => {
    const { platform, loading } = this.props

    return(
      <ScrollView style={styles.feedContainer}>
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
    instagramFeed: state.socialFeed.instagramFeed,
    facebookFeed: state.socialFeed.facebookFeed,
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
