import React, { Component } from 'react'

// Native
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native'

// Components
import ImageCircle from '../UtilityComponents/ImageCircle'
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle'
import ScrollWheel from '../ProfileScreen/ScrollWheel'
import FeedCard from '../SocialFeed/FeedCard'
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'
import MyPicturesModal from '../ProfileScreen/MyPicturesModal'

// Libraries
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { CachedImage } from "react-native-img-cache";

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFeed } from '../../Redux/SocialFeedStore'
import { getMyPics } from '../../Redux/UserStore'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS, isIOS } from '../../Utils/constants'
import { capitalizeWord, testDeepLinkAbility } from '../../Utils/functions'

// Images
import { Images, Metrics } from '../../Themes'

// Styles
import styles from '../Styles/FeedCardStyles'

import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux'

class NearbyFeedCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      platform: 'camera',
      loadInThisCard: false,
      showModal: false,
      currentPics: '',
      currentPicIdx: 0
    }
  }

  componentWillMount = () => {
    const { social_profiles, pictures } = this.props.friendData

    if (!pictures.length) {
      this.setState({platform: `${social_profiles[0].provider}`})
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { fetchFeed, friendData, accessToken, getMyPics } = this.props
    if (prevState.platform !== this.state.platform && this.state.platform !== 'camera') {
      fetchFeed(accessToken, friendData.id, this.state.platform)
    } else if (prevState.platform !== this.state.platform && this.state.platform === 'camera') {

    }
  }

  renderSocialMediaCards = () => {
    const { social_profiles } = this.props.friendData
    return social_profiles.map( (socialProfile, idx) =>
      <SocialMediaCard
        key={idx}
        platformName={socialProfile.provider === 'google-oauth2' ? 'youtube' : socialProfile.provider}
        userName={socialProfile.username}
        synced={true}
        readOnly={true}
        syncedBGColor={socialProfile.provider === 'google-oauth2' ? 'red' : SYNCED_CARD_COLORS[socialProfile.provider]}
      />
    )
  }

  handlePlatformChange = platform => {
    this.setState({ platform: platform, loadInThisCard: true })
    setTimeout(() => this.setState({ loadInThisCard: false }), 2000)
  }

  pullUid = platform => {
    const { friendData } = this.props
    let filtered = friendData.social_profiles.filter(
      obj => obj.provider === platform
    )

    if (filtered[0]) {
      return filtered[0].uid
    }
  }

  pullUsername = platform => {
    const { friendData } = this.props
    let filtered = friendData.social_profiles.filter( obj => obj.provider === platform)

    if (filtered[0]) {
      return filtered[0].username
    }
  }

  renderDeeplinkButton = () => {
    const { platform } = this.state
    const { friendData } = this.props

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
              'width': 100,
              'height': 30,
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

        return(
          <ConnectButton
            title="Go to Facebook"
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
      case 'google-oauth2':
        const youtubeData = friendData.social_profiles.find(platform => platform.provider === 'google-oauth2')
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
    }
  }

  handlePicturePush = (imageObjs, idx) => {
    const { showModal, currentPics } = this.state

    this.setState({ showModal: true, currentPics: imageObjs, currentPicIdx: idx })
  }

  renderPictures = () => {
    const { friendData } = this.props
    let mappedPictures

    if (friendData && friendData.pictures && friendData.pictures.length) {
      mappedPictures = friendData.pictures.map( (imageObj, idx) => {
        return(
          <TouchableOpacity
            key={idx}
            onPress={() => this.handlePicturePush(friendData.pictures, idx)}
            style={styles.myPicsCard}>
            <CachedImage
              style={{ height: '100%', width: Metrics.screenWidth * 0.3, 'borderRadius': 10}}
              source={{uri: imageObj.url}}
            />
          </TouchableOpacity>
        )
      })
    } else {
      mappedPictures = <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
          Whoops! Looks this user has not set up My Pictures yet!
        </Text>
        <View style={{ padding: 20 }}>
          <Icon
            name="camera"
            type="entypo"
            size={100}
          />
        </View>
      </View>
    }

    return (
    <View style={styles.myPicsContainer}>
      {mappedPictures}
    </View>
    )
  }

  // code commented out since FB deeplink functionality has been restored
  // renderFeedMessage = platform => {
  //   if (platform === 'facebook') {
  //     return "Due to tightened restrictions from Facebook, this feature is currently unavailable."
  //   } else {
  //     return (
  //       <Text>{`View content on ${capitalizeWord(platform)}`}</Text>)
  //   }
  // }

  renderContent = () => {
    const { feed, friendData } = this.props
    const { platform } = this.state
    const { id } = friendData

    const filteredFeed = feed[id] && feed[id][platform] ? feed[id][platform] : []

    if (platform === 'profile'){
      return this.renderSocialMediaCards()
    } else if (platform === 'camera') {
      return this.renderPictures()
    } else if (filteredFeed && filteredFeed.length) {
      return filteredFeed.map( (feedObj, idx) => <FeedCard key={idx} item={feedObj}/> )
    } else if (filteredFeed) {
      return (
        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 10, width: 300}}>
          <Text
            style={{ fontSize: 16, fontWeight: '500'}}>
            {`View content on ${capitalizeWord(platform)}`}
          </Text>
          <View style={styles.deepLinkButtonContainer}>
            {this.renderDeeplinkButton(platform)}
          </View>
        </View>
      )
    }
  }

  toggleMyPicturesModal = () => {
    const { showModal } = this.state

    this.setState({ showModal: !showModal })
  }

  render = () => {
    const { friendData, fetching, setFriendInfo } = this.props
    const { platform, currentPics, showModal, currentPicIdx } = this.state
    const socialPlatforms = friendData.social_profiles.map(prof => prof.provider)

    return(
      <LazyloadView style={styles.nearbyFeedCardContainer}>
        <MyPicturesModal
          imageObjects={currentPics}
          visible={showModal}
          toggle={this.toggleMyPicturesModal}
          xOffset={(1787/5) * (currentPicIdx)}
        />
        <LazyloadView style={styles.header}>
          <LinearGradient
            colors={['#2aa5c0','#5664bd', '#9011ba', '#b31c85', '#e73436']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
            style={styles.linearGradient}
          >
            <LazyloadView style={styles.nearbyFeedCardHeader}>
              <LazyloadView style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={setFriendInfo}>
                  <ImageCircle source={`${friendData.picture}`} size={60}/>
                </TouchableOpacity>
              </LazyloadView>
              <LazyloadView style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 5 }}>
                <Text style={styles.name}>{`${friendData.first_name} ${friendData.last_name}`} </Text>
                {
                    friendData && friendData.hobbies && friendData.hobbies.length
                    ? <Text style={styles.hobbies}>{ friendData.hobbies.join(', ') }</Text>
                    : null
                }
                <Text style={styles.location}>{ friendData.hometown }</Text>
              </LazyloadView>
              <LazyloadView style={[styles.deepLinkButtonContainer, { marginRight: 10}]}>
                {this.renderDeeplinkButton()}
              </LazyloadView>
            </LazyloadView>
          </LinearGradient>
        </LazyloadView>
        <LazyloadView style={styles.scrollWheel}>
          <ScrollWheel
            handlePlatformChange={this.handlePlatformChange}
            handleBackToProfile={this.props.setFriendInfo}
            selected={platform}
            profilePic={friendData.image}
            socialPlatforms={socialPlatforms}
          />
      </LazyloadView>
        <LazyloadView style={[{ flex: 1, backgroundColor: 'white'}, platform !== 'camera' && {alignItems: 'center'}]}>
          <LazyloadScrollView
            horizontal={platform === 'profile' || platform === 'camera' ? false : true}
            showsHorizontalScrollIndicator
            contentContainerStyle={styles.contentContainer}
          >
            {fetching && this.state.loadInThisCard
              ? <LazyloadView style={styles.loading}>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                  />
              </LazyloadView>
              : this.renderContent()
            }
          </LazyloadScrollView>
        </LazyloadView>
      </LazyloadView>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.authStore.accessToken,
    feed: state.socialFeed.feed,
    fetching: state.socialFeed.fetching,
    userData: state.userStore.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchFeed, getMyPics }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyFeedCard)
