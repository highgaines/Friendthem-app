import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
      syncedCardColors: SYNCED_CARD_COLORS
    }
  }

  render() {
    const {
      platforms,
      onPressCallback,
      snapchatCallback,
      platformSelected,
      fromFriendProfile
    } = this.props
    const { socialMediaData, syncedCardColors, selectedSocialMedia } = this.state

    return (
      <ScrollView contentContainerStyle={styles.socialAccountContainer}>
      {
        Object.keys(socialMediaData).map((socialPlatform, idx) => {
          const isYoutube = socialPlatform === 'youtube'
          const isSnapchat = socialPlatform === 'snapchat'
          const currentPlatform = platformSelected(isYoutube ? 'google-oauth2' : socialPlatform)
          const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1)
          const userName = currentPlatform && false ? currentPlatform['access_token'][socialMediaData[socialPlatform]['userNamePath']] : null
          const isSynced = !!currentPlatform

          return (
            <SocialMediaCard
              key={idx}
              platformName={capitalizeName(socialPlatform)}
              selected={isSynced}
              socialAuth={isSnapchat && !fromFriendProfile ? snapchatCallback :  onPressCallback}
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
  userInfo: state.userStore.userData,
  platforms: state.tokenStore.platforms,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaCardContainer)
