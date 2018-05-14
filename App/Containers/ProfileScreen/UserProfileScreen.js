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
import { NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash'

// Components
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer'
import HelpModal from '../TutorialScreens/HelpModal'
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import PersonalInfoTab from './PersonalInfoTab'
import MyPicturesContainer from './MyPicturesContainer'
import FriendThemModal from '../UtilityComponents/FriendThemModal'
import ChangePasswordModal from './ChangePasswordModal'
import FbPhotoModal from './FbPhotoModal'
import ConfirmPasswordChangeModal from './ConfirmPasswordChangeModal'
import SuperTextConnect from './SuperTextConnect'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { getUserInfo, getUserScore, updateInfo, updateSnapInfo, updateInfoRequest, getFBPhotos } from '../../Redux/UserStore'
import AuthStoreActions, { socialMediaAuth, socialMediaAuthErrors, clearAuthErrors } from '../../Redux/AuthStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/UserProfileStyles'
import { ifIphoneX } from '../../Themes/Helpers'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS, isIOS } from '../../Utils/constants'

// Env
import envConfig from '../../../envConfig'

class UserProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profilePic: props.userInfo.picture,
      externalAuth: false,
      showSyncHelp: false,
      showPicturesHelp: false,
      showInfoHelp: false,
      currentPlatform: null,
      tab: 'Networks',
      snapHandleModalOpen: false,
      appState: AppState.currentState,
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
      showChangePasswordModal: false,
      showFbPhotoModal: false,
      isProfile: false,
      showErrorModal: false,
      showConfirmPasswordChangeModal: false
    }
  }


  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserInfo, loggedIn, getUserTokens, getUserScore } = this.props
    AppState.addEventListener('change', this._handleAppStateChange)

    if (apiAccessToken && loggedIn) {
      getUserInfo(apiAccessToken)
      getUserTokens(apiAccessToken)
      getUserScore(apiAccessToken)
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentWillUnmount = () => {
    this.setState({ showSyncHelp: false })
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  componentDidMount = () => {
    const { userInfo } = this.props
    if (userInfo.social_profiles && !userInfo.social_profiles.length) {
      setTimeout(() => this.triggerFriendster(), 800)
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { getUserInfo, apiAccessToken, socialMediaAuthErrors } = this.props
    const { externalAuth, appState } = this.state
    const returningToApp = appState.match(/inactive|background/) && nextState.appState === 'active'

    if (externalAuth && returningToApp) {
      this.setState({externalAuth: false}, () => {
        getUserInfo(apiAccessToken)
        socialMediaAuthErrors(apiAccessToken)
      })
    }

  }

  componentDidUpdate = prevProps => {
    const { apiAccessToken, authRedirectUrl, refreshingToken, getUserInfo, getUserTokens, fetching, fbAuthToken } = this.props
    const { socialMediaData, currentPlatform } = this.state
    const doneFetching = prevProps.fetching && !fetching
    const updatedAuth = prevProps.apiAccessToken !== apiAccessToken

    if (authRedirectUrl && !prevProps.authRedirectUrl && currentPlatform) {
      const platformName = currentPlatform === 'google-oauth2' ? 'youtube' : currentPlatform
      const deepLinkBase = isIOS ? socialMediaData[platformName].deepLinkUrl : socialMediaData[platformName].androidDeepLinkUrl
      const deepLinkAuth = isIOS ? `${deepLinkBase}${authRedirectUrl.split('.com/')[1]}` : `${deepLinkBase}${authRedirectUrl.split('?')[1]}`

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

    if (!refreshingToken && prevProps.refreshingToken || doneFetching || updatedAuth) {
      getUserInfo(apiAccessToken)
      getUserTokens(apiAccessToken)
    }

    const authHasErrors = prevProps.authErrors && this.props.authErrors && prevProps.authErrors.length < this.props.authErrors.length
    if (authHasErrors) {
      this.toggleErrorModal()
    }
  }

  togglePhotoModal = (isProfile = true, pictureId) => {
    this.setState({
        showFbPhotoModal: !this.state.showFbPhotoModal,
        isProfile: isProfile,
        editingPictureId: pictureId
      })
  }

  updateProfilePictureState = (url) => {
    this.setState({ profilePic: url })
  }

  triggerFriendster = () => {
    const { showSyncHelp } = this.state
    this.setState({ showSyncHelp: !showSyncHelp })
  }

  triggerPicturesHelp = () => {
    const { showPicturesHelp } = this.state
    this.setState({ showPicturesHelp: !showPicturesHelp})
  }

  triggerInfoHelp = () => {
    const { showInfoHelp } = this.state
    this.setState({ showInfoHelp: !showInfoHelp })
  }

  _handleAppStateChange = nextAppState => {
    this.setState({appState: nextAppState})
  }

  authenticateSocialMedia = platform => {
    const { userId, apiAccessToken } = this.props
    const updatedPlatform = platform === 'linkedin' ? 'linkedin-oauth2' : platform

    this.setState({currentPlatform: platform})
    this.props.socialMediaAuth(updatedPlatform, userId, apiAccessToken).then( () => {
      this.props.getUserInfo(apiAccessToken)
    })
  }

  socialPlatformPresent = (provider) => {
    const { platforms, userInfo } = this.props

    switch (provider) {
      case 'snapchat':
        return userInfo.social_profiles.filter( profile => profile.provider === 'snapchat').length
      case 'youtube':
        return userInfo.social_profiles.find(platformObj => platformObj.provider === 'google-oauth2')
      case 'linkedin':
        return userInfo.social_profiles.find(platformObj => platformObj.provider === 'linkedin-oauth2')
      default:
        return userInfo.social_profiles.find(platformObj => platformObj.provider === provider)
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

  authErrorMessage = () => {
    const { authErrors } = this.props
    let errorMsg

    if (authErrors && authErrors.length) {
      let { message } = authErrors[0]
      errorMsg = message
    }

    return errorMsg || 'We encountered an error when we tried syncing one of your accounts'
  }

  toggleErrorModal = () => {
    const { showErrorModal } = this.state
    this.setState({ showErrorModal: !showErrorModal })
  }

  toggleConfirmPasswordModal = () => {
    this.setState({ showConfirmPasswordChangeModal: !this.state.showConfirmPasswordChangeModal })
  }

  checkForErrors = () => {
    const { authErrors } = this.props
    if (authErrors.length) {
      this.toggleErrorModal()
    }
  }

  buildProfileMessageText = () => {
    const { socialMediaData } = this.state

    return this.props.userInfo.social_profiles.reduce((msgContent, profile) => {
      const provider = profile.provider
      if (provider === 'linkedin-oauth2') {
        return msgContent += `LinkedIn: ${profile.profile_url} \n\n`
      } else {
        const byUID = provider === 'facebook' || provider === 'snapchat'
        const userIdentifier = byUID ? profile.uid : provider === 'google-oauth2' ? `channel/${profile.youtube_channel}` : profile.username
        const providerName = provider === 'google-oauth2' ? 'youtube' : provider

        if (provider === 'snapchat') {
          return msgContent += `${_.capitalize(providerName)}: https://www.snapchat.com/add/${userIdentifier} \n\n`
        } else {
          return msgContent += `${_.capitalize(providerName)}: https://www.${providerName}.com/${userIdentifier} \n\n`
        }
      }
    }, '')
  }

  // test action to fetch errors during authentication
  getErrors = () => {
    const { apiAccessToken } = this.props
    this.props.socialMediaAuthErrors(apiAccessToken)
  }

  renderContainer = () => {
    const { userInfo } = this.props
    const { tab, editingPictureId } = this.state

    if (tab === "Networks") {
      return (
        <View>
          <Animatable.View animation="slideInLeft">
            <SocialMediaCardContainer
              fromUserProfile={true}
              fromFriendProfile={false}
              platformSelected={(platform) => false}
              snapchatCallback={this.toggleSnapchatModal}
              onPressCallback={(platform) => this.authenticateSocialMedia(platform)}
              platformSynced={((socialMedia) => this.socialPlatformPresent(socialMedia))}
            />
          </Animatable.View>
          <SuperTextConnect
            userId={userInfo.id}
            profileLinks={this.buildProfileMessageText()}
          />
        </View>
      )
    } else if (tab === "Info") {
      return(
        <ScrollView style={styles.scrollContainer}>
          <Animatable.View animation="slideInUp">
          <PersonalInfoTab
            toggleInfoHelp={this.triggerInfoHelp}
            toggleChangePasswordModal={this.toggleChangePasswordModal}
          />
        </Animatable.View>
        </ScrollView>
      )
    } else if (tab === "Pics") {
      return (
        <Animatable.View animation="slideInLeft">
          <MyPicturesContainer
            userInfo={userInfo}
            togglePicturesHelp={this.triggerPicturesHelp}
            togglePhotoModal={this.togglePhotoModal}
          />
        </Animatable.View>
      )
    }
  }

  render() {
    const {
      apiAccessToken,
      clearAuthErrors,
      fetching,
      fetchingScore,
      fetchingMyPics,
      getUserInfo,
      getUserTokens,
      isFetchingInitialUser,
      navigation,
      platforms,
      updateInfo,
      userId,
      userInfo,
      userInterests,
      userLocation,
      userPhotos,
      userScore,
    } = this.props

    const {
      editingPictureId,
      showSyncHelp,
      showPicturesHelp,
      showInfoHelp,
      socialMediaData,
      socialNetworkTab,
      syncedCardColors,
      showErrorModal,
      tab,
    } = this.state

    const {
      devGoogleBaseURL,
      devGoogleApiParams,
      devGoogleClientId
    } = envConfig.Development

    const backAction =  NavigationActions.back()
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
            {isFetchingInitialUser || fetching
              ? <View style={[styles.profileHeader, { height: 150, justifyContent: 'center'}]}>
                  <ActivityIndicator size="large" color="#0000ff"/>
                </View>
              : <View style={[styles.profileHeader, { height: 150}, renderIpxHeader]}>
                  <View style={styles.backIcon}>
                    <Icon
                      name='arrow-back'
                      type='materialicons'
                      underlayColor={'transparent'}
                      size={36}
                      color='#FFF'
                      onPress={() => navigation.dispatch(backAction) }
                    />
                  </View>
                  <View style={styles.scoreContainer}>
                  { fetchingScore ?
                    <ActivityIndicator size='small' /> :
                    [<Image key={0} source={Images.friendthemPointsLogo} style={{height: 40, width: 40}}/>,
                    <Text key={1} style={styles.scoreText}>{userScore.toLocaleString()}</Text>]
                  }
                  </View>
                  <View style={styles.profHeaderTop}>
                  {
                    this.state.profilePic ?
                    <TouchableOpacity onPress={this.handleImagePress}>
                      <Image
                        style={[styles.profileImage]} source={{uri: `${this.state.profilePic}`}}
                      />
                      <Image style={styles.cameraIcon} source={Images.cameraIconSmall}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.handleImagePress}>
                      <Icon
                        containerStyle={[styles.profileImage]}
                        name='ios-person'
                        type='ionicon'
                        size={95}
                        color='#000' />
                      <Image style={styles.cameraIcon} source={Images.cameraIconSmall}/>
                    </TouchableOpacity>
                  }
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.profileSubtext}>
                      {`${userInfo.first_name} ${userInfo.last_name}`}
                    </Text>
                  </View>
                </View>
              }
            <FriendThemModal
              modalVisible={this.state.snapHandleModalOpen}
              snapchat={true}
              form={true}
              headerText='Snapchat'
              text='Entering your Snapchat handle here will help us
              connect you with people more seamlessly.'
              toggleModal={this.toggleSnapchatModal}
              submitText={(inputValue, apiAccessToken) => this.props.updateSnapInfo('snapchat', inputValue, apiAccessToken)} />
            <FriendThemModal
              modalVisible={showErrorModal}
              toggleModal={this.toggleErrorModal}
              auth={true}
              headerText='Whoops!'
              text={this.authErrorMessage()}
              okActionCallback={clearAuthErrors}
            />
            <View
              testID='tab-selection-container'
              style={styles.tabSelectionContainer}>
              <TouchableOpacity
                onPress={() => this.setState({ tab: "Networks" })}
                style={[styles.tabItem, tab === "Networks" ? styles.selected : null]}>
                <Text
                  style={[styles.tabText, tab === "Networks" ? styles.selectedText : null]}
                >
                  SOCIAL NETWORKS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID='personal-info-tab'
                onPress={() => this.setState({ tab: "Info" })}
                style={[styles.tabItem, tab === "Info" ? styles.selected : null]}>
                <Text
                  style={[styles.tabText, tab === "Info" ? styles.selectedText : null]}
                  >
                  PERSONAL INFO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ tab: "Pics" })}
                style={[styles.tabItem, tab === "Pics" ? styles.selected : null]}>
                <Text
                  style={[styles.tabText, tab === "Pics" ? styles.selectedText : null]}
                >
                  MY PICTURES
                </Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>
            {fetchingMyPics
              ? <View style={{ marginTop: 40 }}>
                  <ActivityIndicator size="large" color="#0000ff"/>
                </View>
              : this.renderContainer()
            }
          <ChangePasswordModal
             modalVisible={this.state.showChangePasswordModal}
             toggleChangePasswordModal={this.toggleChangePasswordModal}
             toggleConfirmPasswordModal={this.toggleConfirmPasswordModal}
           />
           <HelpModal
             triggerModal={this.triggerFriendster}
             modalVisible={this.state.showSyncHelp}
             text={"Welcome to Friendthem! Let`s get you started by syncing up all your social media accounts. Press on a Social Platform card to begin."}
           />
           <HelpModal
             triggerModal={this.triggerPicturesHelp}
             modalVisible={this.state.showPicturesHelp}
             text={"Looks like you haven't posted all 6 pictures yet! Let's fix that! Press the Add Image card to add pictures that other users can view on your profile!"}
           />
           <HelpModal
             triggerModal={this.triggerInfoHelp}
             modalVisible={this.state.showInfoHelp}
             text={"Your profile information is incomplete! Let`s update some of the fields here so that your profile visitors can get a better idea of who you are!"}
           />
         <ConfirmPasswordChangeModal
           toggleModal={this.toggleConfirmPasswordModal}
           modalVisible={this.state.showConfirmPasswordChangeModal}
           />
          <FbPhotoModal
            modalVisible={this.state.showFbPhotoModal}
            editingPictureId={editingPictureId}
            togglePhotoModal={this.togglePhotoModal}
            userPhotos={userPhotos}
            isProfile={this.state.isProfile}
            updateProfilePictureState={this.updateProfilePictureState}
           />
        </View>
    )
  }
}

const mapStateToProps = state => ({
  apiAccessToken: state.authStore.accessToken,
  authRedirectUrl: state.tokenStore.authRedirectUrl,
  authErrors: state.authStore.authErrors,
  editableData: state.userStore.editableData,
  fbAuthToken: state.fbStore.fbAccessToken,
  fetching: state.userStore.fetching,
  fetchingMyPics: state.userStore.fetchingMyPics,
  fetchingScore: state.userStore.fetchingScore,
  isFetchingInitialUser: state.userStore.isFetchingInitialUser,
  loggedIn: state.authStore.loggedIn,
  needsFetchTokens: state.tokenStore.needsFetchTokens,
  platforms: state.tokenStore.platforms,
  refreshingToken: state.authStore.refreshingToken,
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  userInterests: state.userStore.interests,
  userLocation: state.userStore.location,
  userPhotos: state.userStore.userPhotos,
  userScore: state.userStore.userScore
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      socialMediaAuthErrors,
      clearAuthErrors,
      getFBPhotos,
      getUserInfo,
      getUserScore,
      getUserTokens,
      updateInfo,
      updateInfoRequest,
      updateSnapInfo,
      socialMediaAuth,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
