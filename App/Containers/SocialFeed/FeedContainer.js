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
import { capitalizeWord, testDeepLinkAbility } from '../../Utils/functions'

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
      loading,
      friendInfo
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

  pullLinkedInURL = () => {
    const { friendInfo } = this.props
    let linkedInURL
    friendInfo.social_profiles.forEach( profile => {
      if(profile.provider === 'linkedin-oauth2') {
        linkedInURL = profile.profile_url
      }
    })
    return linkedInURL
  }

  renderDeeplinkButton = platform => {
      const { friendInfo } = this.props

      switch(platform) {
        case 'instagram':
          const igUid = this.pullUid('instagram')
          const igUserName = this.pullUsername('instagram')
          const instaDeepLink = `instagram://user?username=${igUserName}`

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
              onPressCallback={() => testDeepLinkAbility('instagram', instaDeepLink, igUserName)}
            />
          )
        case 'facebook':
          const fbUid = this.pullUid('facebook')
          const fbDeepLink = `fb://profile/${fbUid}`

          // inactive prop to remove facebook profile access from users
          return(
            <ConnectButton
              title="Go to Facebook"
              inactive={true}
              color={SYNCED_CARD_COLORS.facebook}
              containerStyle={[styles.deepLinkButton, styles.facebookDeeplinkButton]}
              textStyle={styles.deepLinkText}
              onPressCallback={() => testDeepLinkAbility('facebook', fbDeepLink, fbUid)}
            />
          )
        case 'twitter':
          const twitterUsername = this.pullUsername('twitter')
          const twitterDeepLink = `twitter://user?screen_name=${twitterUsername}`

          return(
            <ConnectButton
              title="Go to Twitter"
              color={SYNCED_CARD_COLORS.twitter}
              containerStyle={[styles.deepLinkButton, styles.twitterDeeplinkButton]}
              textStyle={styles.deepLinkText}
              onPressCallback={() => testDeepLinkAbility('twitter', twitterDeepLink, twitterUsername)}
            />
          )
        case 'youtube':
          const youtubeData = friendInfo.social_profiles.find(platform => platform.provider === 'google-oauth2')
          const youtubeChannel = youtubeData ? youtubeData.youtube_channel : ''
          const youtubeDeeplink = `vnd.youtube://www.youtube.com/channel/${youtubeChannel}`

          return (
            <ConnectButton
              title="Go to Youtube"
              color={SYNCED_CARD_COLORS.youtube}
              containerStyle={[styles.deepLinkButton, styles.youtubeDeeplinkButton]}
              textStyle={styles.deepLinkText}
              onPressCallback={() => testDeepLinkAbility('youtube', youtubeDeeplink, youtubeChannel)} />
          )
        case 'snapchat':
          const snapchatUsername = this.pullUsername('snapchat')
          const snapChatDeepLink = `snapchat://add/${snapchatUsername}`

          return (
            <ConnectButton
              title="Go to Snapchat"
              color={SYNCED_CARD_COLORS.youtube}
              containerStyle={[styles.deepLinkButton, styles.snapchatDeeplinkButton]}
              textStyle={styles.deepLinkText}
              onPressCallback={() => testDeepLinkAbility('snapchat', snapChatDeepLink, snapchatUsername)} />
          )
        case 'linkedin':
          const linkedInURL = this.pullLinkedInURL()

          return (
            <ConnectButton
              title="Go to LinkedIn"
              color={SYNCED_CARD_COLORS.linkedin}
              containerStyle={[styles.deepLinkButton, styles.linkedInDeepLinkButton]}
              textStyle={styles.deepLinkText}
              onPressCallback={() => Linking.openURL(linkedInURL)} />
          )
      }
    }

  // commented out while FB deeplink is functional
  // renderFeedMessage = platform => {
  //   if (platform === 'facebook') {
  //     return "Due to tightened restrictions from Facebook, this feature is currently unavailable."
  //   } else {
  //     return `View content on ${capitalizeWord(platform)}`
  //   }
  // }

  renderFeedCards = platform => {
    const { userId, feed } = this.props
    const userFeedArr = feed[userId] && feed[userId][platform] ? feed[userId][platform] : []
    return userFeedArr.length
    ? userFeedArr.map( (item, idx) => <FeedCard key={idx} item={item}/>)
    : <View style={{top: 100}}>
        <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
          {`View content on ${capitalizeWord(platform)}`}
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
