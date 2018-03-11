import React, { Component } from 'react'

import { View, TouchableOpacity, Text, Button, ScrollView, ActivityIndicator, Linking } from 'react-native';

// Components
import FeedCard from './FeedCard';
import ConnectButton from '../SuperConnectScreen/ConnectButton';

// Libraries
import { Icon } from 'react-native-elements';
import Image from 'react-native-remote-svg';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialFeedStoreActions, { fetchFeed } from '../../Redux/SocialFeedStore'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'

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
      accessToken,
      loading
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

  pullUid = platform => {
    const { friendInfo } = this.props
    let filtered = friendInfo.hasOwnProperty('social_profiles')
    ? friendInfo.social_profiles.filter(obj => obj.provider === platform)
    : []

    if (filtered[0]) {
      return filtered[0].uid
    }
  }

  pullUsername = platform => {
    const { friendInfo } = this.props
    let filtered = friendInfo.hasOwnProperty('social_profiles')
    ? friendInfo.social_profiles.filter( obj => obj.provider === platform)
    : []

    if (filtered[0]) {
      return filtered[0].username
    }
  }

  renderDeeplinkButton = platform => {
    const { friendData } = this.props

    switch(platform) {
      case 'instagram':
      const igUid = this.pullUid('instagram')

        return(
          <ConnectButton
            title="Go to Instagram"
            linearGradient={true}
            gradientColors={
              [
              '#9011ba',
              '#b31c85',
              '#dc3369',
              '#ed384d',
              '#fec052'
            ]}
            gradientStyles={{
              'width': 150,
              'height': 50,
              'marginTop': 20,
              'borderRadius': 30,
              'justifyContent': 'center'
            }}
            containerStyle={styles.deepLinkButton}
            textStyle={styles.deepLinkText}
            onPressCallback={() => Linking.openURL(`instagram://user?id=${igUid}`)}
          />
        )
      case 'facebook':
      const fbUid = this.pullUid('facebook')
        return(
          <ConnectButton
            title="Go to Facebook"
            color={SYNCED_CARD_COLORS.facebook}
            containerStyle={[styles.deepLinkButton, styles.facebookDeeplinkButton]}
            textStyle={styles.deepLinkText}
            onPressCallback={() => Linking.openURL(`fb://profile/${fbUid}`)}
          />
        )
      case 'twitter':
      const twitterUsername = this.pullUsername('twitter')
        return(
          <ConnectButton
            title="Go to Twitter"
            color={SYNCED_CARD_COLORS.twitter}
            containerStyle={[styles.deepLinkButton, styles.twitterDeeplinkButton]}
            textStyle={styles.deepLinkText}
            onPressCallback={() => Linking.openURL(`twitter://user?screen_name=${twitterUsername}`)}
          />
        )
    }
  }

  renderFeedCards = platform => {
    const { userId, feed } = this.props
    const userFeedArr = feed[userId] && feed[userId][platform] ? feed[userId][platform] : []
    return userFeedArr.length
    ? userFeedArr.map( (item, idx) => <FeedCard key={idx} item={item}/>)
    : <View style={{top: 100}}>
        <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
          Whoops! There is no content to render!
        </Text>
        <View style={styles.deepLinkButtonContainer}>
          {this.renderDeeplinkButton(platform)}
        </View>
      </View>
  }

  linkToProfile = url => {
    Linking.openURL(url)
  }

  render = () => {
    const { platform, loading, friendInfo } = this.props
    const isInstagram = platform === 'instagram'
    const instaObject = friendInfo && friendInfo.social_profiles && friendInfo.social_profiles.find(profile => profile.provider === 'instagram')
    const instaUrl = instaObject && instaObject.uid ? `https://www.instagram.com/eoghanl` : ''
    const capitalizedPlat = platform ? `${platform.split('')[0].toUpperCase()}${platform.split('').slice(1).join('')}` : ''
    return(
      <ScrollView contentContainerStyle={styles.feedContainer}>
        <Text style={[styles.titleText, { fontWeight: '600', fontStyle: 'italic'}]}> {capitalizedPlat} Feed </Text>
          {loading
            ? <View
                style={styles.loading, { marginTop: 40 }}>
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  />
              </View> :
              this.renderFeedCards(platform)}
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
