import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity } from 'react-native'

import SocialMediaCard from '../SocialMediaCards/SocialMediaCard';
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'
import styles from '../Styles/UserProfileStyles';

class SocialMediaCardContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPlatform: '',
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
      selectedSocialMedia: []
    }
  }

  authenticateSocialMedia = platform => {
    const { userId, apiAccessToken } = this.props

    this.setState({currentPlatform: platform})
    this.props.socialMediaAuth(platform, userId, apiAccessToken)
  }

  socialPlatformPresent = (provider) => {
    const { platforms, userInfo } = this.props

    switch (provider) {
      case 'snapchat':
        return userInfo && userInfo.snapHandle
      case 'youtube':
        return platforms.find(platformObj => platformObj.provider === 'google-oauth2')
      default:
        return platforms.find(platformObj => platformObj.provider === provider)
    }
  }

  render() {
    const { platforms } = this.props
    const { socialMediaData, syncedCardColors, selectedSocialMedia } = this.state

    return (
      <ScrollView contentContainerStyle={styles.socialAccountContainer}>
      {
        Object.keys(socialMediaData).map((socialPlatform, idx) => {
          const isYoutube = socialPlatform === 'youtube'
          const currentPlatform = selectedSocialMedia.find(platform => platform === socialPlatform || 'google-oauth2')
          const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1)
          const userName = currentPlatform && false ? currentPlatform['access_token'][socialMediaData[socialPlatform]['userNamePath']] : null
          const isSynced = !!currentPlatform

          return (
            <SocialMediaCard
              key={idx}
              platformName={capitalizeName(socialPlatform)}
              selected={isSynced}
              socialAuth={(platform) =>
                this.setState({
                  selectedSocialMedia: [...selectedSocialMedia, platform]
                })
              }
              platformAuth={isYoutube ? 'google-oauth2' : socialPlatform}
              userName={userName}
              syncedBGColor={syncedCardColors[socialPlatform]}
            />
          )
        })
      }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  platforms: state.tokenStore.platforms,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      socialMediaAuth,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaCardContainer)
