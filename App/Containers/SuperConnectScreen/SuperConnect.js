import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Button, AppState, Linking, Modal } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FBSDK, { AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import LinearGradient from 'react-native-linear-gradient'
import { SocialIcon } from 'react-native-elements'
import _ from 'lodash'

import ConnectBar from './ConnectBar'
import ConnectivityBanner from '../UtilityComponents/ConnectivityBanner'
import ButtonsContainer from './ButtonsContainer'
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer'
import SuperConnectTutorial from '../TutorialScreens/SuperConnectTutorial'
import UserStoreActions, { updateTutorialStatus } from '../../Redux/UserStore'
import SuperConnectActions, { superConnectPlatform } from '../../Redux/SuperConnectStore'
import FriendStoreActions, { checkFriendConnection } from '../../Redux/FriendStore'
import InviteUsersStoreActions, { fetchConnectivityData, fetchMyFriendsData } from '../../Redux/InviteUsersStore'
import { MANUAL_CONNECT_PLATFORMS, SOCIAL_MEDIA_DATA, isIOS } from '../../Utils/constants'

import { Images } from '../../Themes'

class SuperConnect extends Component {
  constructor(props) {
    super(props)

    this._handleAppStateChange = this._handleAppStateChange.bind(this)

    this.state = {
      fbToken: null,
      bannerVisible: false,
      bannerName: '',
      bannerPlatform: '',
      userInputRequiredPlatforms: [],
      appState: AppState.currentState,
      manualPlatformsList: MANUAL_CONNECT_PLATFORMS,
      manualPlatformIndex: 0,
      tutorialInProgress: false,
      tutorialIndex: 0
    }

    this.initialState = this.state
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.toggleTutorial()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { apiAccessToken, friendInfo, platforms, setManualPlatforms, setFriendInfo, checkFriendConnection, fetchConnectivityData, fetchMyFriendsData } = this.props
    const { userInputRequiredPlatforms, manualPlatformIndex } = this.state
    const manualPlatformsUpdated = userInputRequiredPlatforms.length && !prevState.userInputRequiredPlatforms.length
    const maxIndex = manualPlatformIndex === userInputRequiredPlatforms.length

    if (manualPlatformsUpdated || (manualPlatformIndex > prevState.manualPlatformIndex && !maxIndex)) {
      if (userInputRequiredPlatforms[manualPlatformIndex]) {
        this.deepLinkToPlatform(userInputRequiredPlatforms[manualPlatformIndex])
      }
    }

    if (maxIndex && manualPlatformIndex === prevState.manualPlatformIndex && userInputRequiredPlatforms.length) {
        this.setState(this.setState(this.initialState), () => setManualPlatforms([]))
        this.props.navigation.navigate('CongratulatoryScreen', {
          userInfo: this.props.userInfo,
          friendInfo: this.props.friendInfo,
          navigation: this.props.navigation,
          setFriendInfo: setFriendInfo,
          updateConnectionInfo: () => checkFriendConnection(apiAccessToken, friendInfo.id),
          loadConnectivityData: () => fetchConnectivityData(apiAccessToken),
          updateFriendData: () => fetchMyFriendsData(apiAccessToken)
        })
    }
  }

  componentWillUnmount = () => {
    this.props.setManualPlatforms([])
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  deepLinkToPlatform = (platformName) => {
    const { friendInfo, platforms } = this.props
    const profile = friendInfo.social_profiles.find(profile => profile.provider === platformName)
    const isSnapchat = platformName === 'snapchat'
    const userIdentifier = platformName === 'facebook' || isSnapchat ? profile.uid : profile.username
    const deepLinkPlatform = isIOS || isSnapchat ?
      SOCIAL_MEDIA_DATA[platformName].superConnectDeepLink
      :
      SOCIAL_MEDIA_DATA[platformName].androidConnectDeepLink(userIdentifier)
    const deepLinkURL = isIOS || isSnapchat ? `${deepLinkPlatform}${userIdentifier}` : deepLinkPlatform

    Linking.canOpenURL(deepLinkURL).then(response => {
      if (response) {
        Linking.openURL(deepLinkURL)
      } else {
        Linking.openURL(`https:/${platformName}.com/${userIdentifier}`)
      }
    })
  }

  _handleAppStateChange = (nextAppState) => {
    const { platforms, apiAccessToken, friendInfo } = this.props
    const { manualPlatformIndex, appState, userInputRequiredPlatforms } = this.state
    const returningToApp = appState.match(/background/) && nextAppState === 'active'
    const connectFB = platforms.find(elem => elem.provider === 'facebook')

    if (returningToApp && manualPlatformIndex < userInputRequiredPlatforms.length) {
      this.asyncSuperConnectPlatform(userInputRequiredPlatforms[manualPlatformIndex], apiAccessToken, friendInfo.id)
      this.setState({ manualPlatformIndex: manualPlatformIndex + 1 })
    }

    this.setState({ appState: nextAppState });
  }

  asyncSuperConnectPlatform = async (platform, apiAccessToken, friendId) => {
    const platName = platform === 'google-oauth2' ? "youtube" : platform
    await this.props.superConnectPlatform(platName, apiAccessToken, friendId)
  }

  toggleNoneSelectedAlert = () => {
    alert('Please select at least one social media platform to connect on!')
  }

  toggleTutorial = () => {
    if (!this.props.tutorialComplete) {
      this.setState({ tutorialInProgress: true })
    }
  }

  superConnectPromiseLoop = () => {
    const {
      selectedSocialMedia,
      friendInfo,
      superConnectPlatform,
      apiAccessToken,
      setManualPlatforms,
      userId,
      connection,
      setFriendInfo,
      checkFriendConnection,
      fetchMyFriendsData,
      fetchConnectivityData
     } = this.props
    const { userInputRequiredPlatforms, manualPlatformsList } = this.state
    const checkConnection = platform => connection.find(element => element.provider === platform)
    let platform = ''
    let tempUserInputArr = []

    if (!selectedSocialMedia.length) {
      this.toggleNoneSelectedAlert()
      return
    }

    for (let i = 0; i < selectedSocialMedia.length; i++) {
      platform = selectedSocialMedia[i].provider

      if (checkConnection(platform)) {
        continue
      }
      else if (manualPlatformsList.includes(platform)) {
        tempUserInputArr.push(platform)
      } else {
        this.asyncSuperConnectPlatform(platform, apiAccessToken, friendInfo.id, userId)
      }
    }
    if (tempUserInputArr.length) {
      this.setState({ userInputRequiredPlatforms: tempUserInputArr })
    } else {
        this.setState(this.initialState)
        this.props.navigation.navigate('CongratulatoryScreen', {
          userInfo: this.props.userInfo,
          friendInfo: this.props.friendInfo,
          navigation: this.props.navigation,
          setFriendInfo: setFriendInfo,
          updateConnectionInfo: () => checkFriendConnection(apiAccessToken, friendInfo.id),
          loadConnectivityData: () => fetchConnectivityData(apiAccessToken),
          updateFriendData: () => fetchMyFriendsData(apiAccessToken)
        })
      }
  }

  socialPlatformPresent = (provider) => {
    const { platforms, userInfo } = this.props

    switch (provider) {
      case 'snapchat':
        return userInfo.social_profiles.find(elem => elem.provider === 'snapchat')
      case 'youtube':
        return platforms.find(platformObj => platformObj.provider === 'google-oauth2')
      default:
        return platforms.find(platformObj => platformObj.provider === provider)
    }
  }

  toggleConnectivityBanner = (friendName, platformName, timeout = null) => {
    if (timeout) {
      this.setState({
        bannerVisible: true,
        bannerName: friendName,
        bannerPlatform: platformName
      })
      setTimeout(() => this.setState({
        bannerVisible: false,
        bannerName: '',
        bannerPlatform: ''
      }), timeout)
    } else {
      this.setState({
        bannerVisible: true,
        bannerName: friendName,
        bannerPlatform: platformName
      })
    }
  }

  completeSuperConnectTutorial = () => {
    const { apiAccessToken, updateTutorialStatus } = this.props

    this.setState({ tutorialInProgress: false}, () =>
      updateTutorialStatus(apiAccessToken, 'tutorial_complete', true)
    )
  }

  render() {
    const { userInfo, friendInfo, navigation, selectedSocialMedia, togglePlatform, platforms, copy, connection, isFriendthem } = this.props
    const { bannerVisible, bannerName, bannerPlatform, tutorialIndex, tutorialInProgress } = this.state
    const { social_profiles, first_name } = friendInfo
    const commonSocialMediaLength = _.intersectionBy(userInfo.social_profiles, social_profiles, 'provider').length
    const allPlatformsSynced = commonSocialMediaLength && connection.length >= commonSocialMediaLength
    const tutorialCallback = !tutorialIndex ?
      () => this.setState({ tutorialIndex: tutorialIndex + 1 }) : this.completeSuperConnectTutorial

    if (allPlatformsSynced  && !bannerVisible) {
      this.toggleConnectivityBanner(first_name, 'on all shared accounts')
    }

    console.log(selectedSocialMedia)
    return (
      tutorialInProgress ?
        <SuperConnectTutorial
          onPressFunction={tutorialCallback}
          bgImage={!tutorialIndex ? Images.scTutorialOne : Images.scTutorialTwo}
        />
      :
      <View style={{ flex: 1 }}>
        <ConnectBar copy={copy} userData={userInfo} friendInfo={friendInfo}/>
        {
          bannerVisible ? <ConnectivityBanner name={bannerName} platform={bannerPlatform}/> : null
        }
        <SocialMediaCardContainer
          fromFriendProfile={true}
          isFriendthem={isFriendthem}
          toggleBanner={this.toggleConnectivityBanner}
          connection={connection}
          friendPlatforms={friendInfo.social_profiles}
          onPressCallback={(platform) => togglePlatform(platform)}
          platformSynced={platform => this.socialPlatformPresent(platform)}
          platformSelected={platform =>
            selectedSocialMedia.find(socialMedia => socialMedia.provider === platform)
          } />
        <View style={{ alignItems: 'center' }}>
          <ButtonsContainer
            superConnectPromiseLoop={selectedSocialMedia.length ?
              this.superConnectPromiseLoop : () => false
            }
            copy={this.props.copy}
            navigation={navigation}
            allPlatformsSynced={allPlatformsSynced}
            facebookUrl={friendInfo.fbUrl}
            friendName={`${friendInfo.first_name}`} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  platforms: state.tokenStore.platforms,
  friendInfo: state.friendStore.friendData,
  connection: state.friendStore.connection,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  selectedSocialMedia: state.superConnect.selectedSocialMedia,
  tutorialComplete: state.userStore.editableData.tutorial_complete
})

const mapDispatchToProps = dispatch => {
  const { togglePlatform, setManualPlatforms } = SuperConnectActions
  const { setFriendInfo } = FriendStoreActions

  return {
    ...bindActionCreators({
      togglePlatform,
      setManualPlatforms,
      superConnectPlatform,
      setFriendInfo,
      checkFriendConnection,
      fetchMyFriendsData,
      fetchConnectivityData,
      updateTutorialStatus
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperConnect)
