import React, { Component } from 'react';

// Native
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';

// Components
import ImageCircle from '../UtilityComponents/ImageCircle';
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ScrollWheel from '../ProfileScreen/ScrollWheel';
import FeedCard from '../SocialFeed/FeedCard';
import ConnectButton from '../SuperConnectScreen/ConnectButton';
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard';

// Libraries
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeed } from '../../Redux/SocialFeedStore';

// Constants
import { SYNCED_CARD_COLORS } from '../../Utils/constants';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedCardStyles';

class NearbyFeedCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      platform: 'instagram'
    }
  }

  componentDidMount = () => {
    const { fetchFeed, friendData, accessToken } = this.props
    fetchFeed(accessToken, friendData.id, this.state.platform)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { fetchFeed, friendData, accessToken } = this.props
    if (prevState.platform !== this.state.platform) {
      fetchFeed(accessToken, friendData.id, this.state.platform)
    }
  }

  renderSocialMediaCards = () => {
    const { social_profiles } = this.props.friendData
    return social_profiles.map( socialProfile =>
      <SocialMediaCard
        platformName={socialProfile.provider === 'google-oauth2' ? 'youtube' : socialProfile.provider}
        userName={socialProfile.username}
        synced={true}
        readOnly={true}
        syncedBGColor={socialProfile.provider === 'google-oauth2' ? 'red' : SYNCED_CARD_COLORS[socialProfile.provider]}
      />
    )
  }

  handleGoToProfile = () => {
    this.setState({ platform: 'profile'})
  }

  handlePlatformChange = platform => {
    this.setState({ platform: platform })
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

        return(
          <ConnectButton
            title="Instagram"
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
              'width': 80,
              'height': 30,
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
            title="Facebook"
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
            title="Twitter"
            color={SYNCED_CARD_COLORS.twitter}
            containerStyle={[styles.deepLinkButton, styles.twitterDeeplinkButton]}
            textStyle={styles.deepLinkText}
            onPressCallback={() => Linking.openURL(`twitter://user?screen_name=${twitterUsername}`)}
          />
        )
    }
  }

  renderContent = () => {
    const { feed, friendData } = this.props
    const { platform } = this.state

    const filteredFeed = feed.filter( feedObj => feedObj.user_id === friendData.id)

    return platform === 'profile'
    ? this.renderSocialMediaCards()
    : filteredFeed.length
      ? filteredFeed[0].data.map( (feedObj, idx) => <FeedCard key={idx} item={feedObj}/> )
      : null
  }

  render = () => {
    const { friendData, loading } = this.props
    const { platform } = this.state

    return(
      <View style={styles.nearbyFeedCardContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#2aa5c0','#5664bd', '#9011ba', '#b31c85', '#e73436']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
            style={styles.linearGradient}
          >
            <View style={styles.nearbyFeedCardHeader}>
              <View style={{ flex: 1 }}>
                <ImageCircle source={`${friendData.picture}`} size={60}/>
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.name}> {`${friendData.first_name} ${friendData.last_name}`} </Text>
                <Text style={styles.hobbies}> Crypto | Gaming | Coding </Text>
                <Text style={styles.location}> New York, NY </Text>
              </View>
              <View style={styles.deepLinkButtonContainer}>
                {this.renderDeeplinkButton()}
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.scrollWheel}>
          <ScrollWheel
            handlePlatformChange={this.handlePlatformChange}
            handleBackToProfile={this.handleGoToProfile}
            selected={platform}
            profilePic={friendData.image}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ScrollView
            horizontal={platform === 'profile' ? false : true}
            contentContainerStyle={[styles.contentContainer, platform === 'profile' ? { 'flex': 1, 'flexWrap': 'wrap', 'justifyContent': 'flex-start' } : '']}
          >
            {loading
              ? <View style={styles.loading}>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                  />
                </View>
              : this.renderContent()
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.authStore.accessToken,
    feed: state.socialFeed.feed,
    loading: state.socialFeed.fetching,
    userData: state.userStore.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchFeed }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyFeedCard)
