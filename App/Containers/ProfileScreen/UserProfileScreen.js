import React, { Component } from 'react'
import { Text, View, Button, Linking , AppState, ScrollView, TouchableOpacity, ActivityIndicator, ActionSheetIOS } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Image from 'react-native-remote-svg'
import RNYoutubeOAuth from 'react-native-youtube-oauth'
import TimerMixin from 'react-timer-mixin'
import ImagePicker from 'react-native-image-picker'
import { uploadToAWS } from '../../Utils/functions'

// Components
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer'
import Navbar from '../Navbar/Navbar'
import PickSocialMediaModal from '../TutorialScreens/PickSocialMediaModal'
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import PersonalInfoTab from './PersonalInfoTab'
import FriendThemModal from '../UtilityComponents/FriendThemModal'
import ChangePasswordModal from './ChangePasswordModal'
import FbPhotoModal from './FbPhotoModal'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { getUserInfo, updateInfo, updateSnapInfo, updateInfoRequest, getFBPhotos } from '../../Redux/UserStore'
import AuthStoreActions, { socialMediaAuth } from '../../Redux/AuthStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/UserProfileStyles'
import { ifIphoneX } from '../../Themes/Helpers'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'

// Env
import envConfig from '../../../envConfig'

class UserProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profilePic: props.userInfo.picture,
      externalAuth: false,
      showFriendster: false,
      currentPlatform: null,
      socialNetworkTab: true,
      snapHandleModalOpen: false,
      appState: AppState.currentState,
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
      showChangePasswordModal: false,
      showFbPhotoModal: false
    }
  }


  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserInfo, loggedIn, getUserTokens } = this.props
    AppState.addEventListener('change', this._handleAppStateChange)

    if (apiAccessToken && loggedIn) {
      getUserInfo(apiAccessToken)
      getUserTokens(apiAccessToken)
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentWillUnmount = () => {
    this.setState({ showFriendster: false })
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  componentDidMount = () => {
    if (!this.props.userInfo.social_profiles.length) {
      setTimeout(() => this.triggerFriendster(), 1500)
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { getUserTokens, apiAccessToken } = this.props
    const { externalAuth, appState } = this.state
    const returningToApp = appState.match(/inactive|background/) && nextState.appState === 'active'

    if (externalAuth && returningToApp) {
      this.setState({externalAuth: false}, () => getUserTokens(apiAccessToken))
    }
  }

  componentDidUpdate = prevProps => {
    const { authRedirectUrl } = this.props
    const { socialMediaData, currentPlatform } = this.state

    if (authRedirectUrl && !prevProps.authRedirectUrl && currentPlatform) {
      const platformName = currentPlatform === 'google-oauth2' ? 'youtube' : currentPlatform
      const deepLinkBase = socialMediaData[platformName].deepLinkUrl
      const deepLinkAuth = `${deepLinkBase}${authRedirectUrl.split('.com/')[1]}`

      this.setState({externalAuth: true})

      // Instagram deeplink OAUTH is broken so use web URL
      if (currentPlatform === 'instagram') {
        Linking.openURL(`${authRedirectUrl}`)
      } else {
        Linking.canOpenURL(deepLinkAuth).then(response => {
            if (response) {
              Linking.openURL(`${deepLinkAuth}`)
            } else {
              Linking.openURL(`${authRedirectUrl}`)
            }
        })
      }
    }
  }

  togglePhotoModal = () => {
    this.setState({ showFbPhotoModal: !this.state.showFbPhotoModal })
  }

  updateProfilePictureState = (url) => {
    this.setState({ profilePic: url })
  }

  triggerFriendster = () => {
    const { showFriendster } = this.state
    this.setState({ showFriendster: !showFriendster })
  }

  _handleAppStateChange = nextAppState => {
    this.setState({appState: nextAppState})
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
        return userInfo.social_profiles.filter( profile => profile.provider === 'snapchat').length
      case 'youtube':
        return platforms.find(platformObj => platformObj.provider === 'google-oauth2')
      default:
        return platforms.find(platformObj => platformObj.provider === provider)
    }
  }

  determineImage = () => {
    const { userInfo } = this.props

    if (userInfo.picture) {
      return {uri: `${userInfo.picture}`}
    } else {
      return Images.noPicSVG
    }
  }

  handleImagePress = () => {
    const { id } = this.props.userInfo
    const {
      editableData,
      apiAccessToken,
      getFBPhotos,
      updateInfoRequest,
      userPhotos
    } = this.props

    const options = {
      title: 'Profile Picture Options',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
        {name: 'delete', title: 'Delete current photo'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 1
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton === 'fb') {
        // fetch fb pics and change social media cards into pic cards
        console.log('User tapped import from facebook')
        getFBPhotos(apiAccessToken)
        this.togglePhotoModal()

      }
      else if (response.customButton === 'delete') {
        // remove picture from backend and replace with noPicSVG
        console.log('User tapped delete current photo')
        this.setState({ profilePic: ''}, () => updateInfoRequest(editableData, 'picture', '', apiAccessToken))

      }
      else {
        // use AWS upload function here to send uri
        let source = response.uri
        this.setState({ profilePic: source }, () => uploadToAWS(source, id, updateInfoRequest, editableData, apiAccessToken))
      }
    })
  }

  toggleSnapchatModal = () => {
    const { snapHandleModalOpen } = this.state

    this.setState({snapHandleModalOpen: !snapHandleModalOpen})
  }

  toggleChangePasswordModal = () => {
    this.setState({
      showChangePasswordModal: !this.state.showChangePasswordModal
    })
  }

  render() {
    const {
      userId,
      userInfo,
      userInterests,
      userLocation,
      navigation,
      apiAccessToken,
      getUserInfo,
      getUserTokens,
      platforms,
      updateInfo,
      fetching,
      userPhotos
    } = this.props
    const { showFriendster, socialMediaData, socialNetworkTab, syncedCardColors } = this.state
    const { devGoogleBaseURL, devGoogleApiParams, devGoogleClientId } = envConfig.Development

    const ipxHeader = { marginTop: 50 }
    const renderIpxHeader = ifIphoneX(ipxHeader, '')

    const ipxInfoTab = ifIphoneX({ 'height': 480}, {'height': 366})

    return (
        <View>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          >
          <PickSocialMediaModal
            triggerModal={this.triggerFriendster}
            showModal={showFriendster}
          />
            {fetching
              ? <View style={[styles.profileHeader, { height: 150, justifyContent: 'center'}]}>
                  <ActivityIndicator size="large" color="#0000ff"/>
                </View>
              : <View style={[styles.profileHeader, { height: 150}, renderIpxHeader]}>
                  <View style={styles.profHeaderTop}>
                  {
                    this.state.profilePic ?
                    <TouchableOpacity onPress={this.handleImagePress}>
                      <Image
                        style={[styles.profileImage]} source={{uri: `${this.state.profilePic}`}}
                      />
                      <Image style={styles.cameraIcon} source={Images.cameraIcon}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.handleImagePress}>
                      <Icon
                        containerStyle={[styles.profileImage]}
                        name='ios-person'
                        type='ionicon'
                        size={95}
                        color='#000' />
                      <Image style={styles.cameraIcon} source={Images.cameraIcon}/>
                    </TouchableOpacity>
                  }
                  </View>
                  <Text style={styles.profileSubtext}>
                  {`${userInfo.first_name} ${userInfo.last_name}`}
                  </Text>
                </View>
              }
            <FriendThemModal
              modalVisible={this.state.snapHandleModalOpen}
              toggleSnapchatModal={this.toggleSnapchatModal}
              submitText={(inputValue, apiAccessToken) => updateSnapInfo('snapchat', inputValue, apiAccessToken)} />
            <View
              testID='tab-selection-container'
              style={styles.tabSelectionContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ socialNetworkTab: true })}
                style={[styles.tabItem, socialNetworkTab ? styles.selected : null]}>
                <Text
                  style={[styles.tabText, socialNetworkTab ? styles.selectedText : null]}
                >
                  SOCIAL NETWORKS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID='personal-info-tab'
                onPress={() => this.setState({ socialNetworkTab: false })}
                style={[styles.tabItem, socialNetworkTab ? null : styles.selected]}>
                <Text
                  style={[styles.tabText, socialNetworkTab ? null : styles.selectedText]}
                  >
                  PERSONAL INFO
                </Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>

        {  socialNetworkTab ?
            <SocialMediaCardContainer
              fromUserProfile={true}
              platformSelected={(platform) => false}
              snapchatCallback={this.toggleSnapchatModal}
              onPressCallback={(platform) => this.authenticateSocialMedia(platform)}
              platformSynced={((socialMedia) => this.socialPlatformPresent(socialMedia))}
            />
          :
            <ScrollView style={ipxInfoTab}>
              <PersonalInfoTab
                toggleChangePasswordModal={this.toggleChangePasswordModal}
                />
            </ScrollView>
         }
          <ChangePasswordModal
             modalVisible={this.state.showChangePasswordModal}
             toggleChangePasswordModal={this.toggleChangePasswordModal}
           />
          <FbPhotoModal
            modalVisible={this.state.showFbPhotoModal}
            togglePhotoModal={this.togglePhotoModal}
            userPhotos={userPhotos}
            updateProfilePictureState={this.updateProfilePictureState}
           />
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  editableData: state.userStore.editableData,
  userPhotos: state.userStore.userPhotos,
  userInterests: state.userStore.interests,
  userLocation: state.userStore.location,
  fetching: state.userStore.fetching,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  loggedIn: state.authStore.loggedIn,
  platforms: state.tokenStore.platforms,
  needsFetchTokens: state.tokenStore.needsFetchTokens,
  authRedirectUrl: state.tokenStore.authRedirectUrl
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      getFBPhotos,
      getUserInfo,
      getUserTokens,
      updateInfo,
      updateInfoRequest,
      updateSnapInfo,
      socialMediaAuth,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
