import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity, AppState, ActionSheetIOS, ActivityIndicator } from 'react-native'

// Libraries
import { CachedImage } from 'react-native-img-cache';
import Communications from 'react-native-communications';
import Contacts from 'react-native-contacts';
import Geocoder from 'react-native-geocoder';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import * as Animatable from 'react-native-animatable'

// Redux
import FBStoreActions from '../../Redux/FBStore'
import SuperConnectActions from '../../Redux/SuperConnectStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'
import FriendStoreActions, { checkFriendConnection, getFriendScore } from '../../Redux/FriendStore'

// Components
import Navbar from '../Navbar/Navbar'
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer'
import SuperConnectBar from '../SuperConnectScreen/SuperConnectBar'
import ScrollWheel from './ScrollWheel'
import FeedContainer from '../SocialFeed/FeedContainer'
import MyPicturesModal from './MyPicturesModal'
import TutorialModal from '../TutorialScreens/TutorialModal'

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserProfileStyles'
import { ifIphoneX } from '../../Themes/Helpers'

class FriendProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      platform: 'profile',
      currentPic: '',
      currentPicIdx: 0,
      myPicturesModalVisible: false,
      feedContainer: false,
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
      selectedSocialMedia: [],
      userLastLocation: null,
      selectedPlatformsUpdated: false,
      showTutorialModal: !props.userInfo.social_profiles.length,
      showSuperConnectModal: false
    }

    this.initialState = this.state
  }

  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserInfo, loggedIn, getUserTokens, setSuperConnectPlatforms, friendInfo } = this.props

    if (apiAccessToken && loggedIn) {
      getUserTokens(apiAccessToken)
      setSuperConnectPlatforms([])
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentDidMount = () => {
    const { apiAccessToken, friendInfo, checkFriendConnection, loggedIn, getMyPics, getFriendScore } = this.props
    const { last_location } = friendInfo

    if (apiAccessToken && loggedIn) {
      checkFriendConnection(apiAccessToken, friendInfo.id)
    }
    if (last_location) {
      Geocoder.geocodePosition(last_location).then(res => {
        const subArea = res[0].subAdminArea || res[0].locality || res[0].subLocality
        this.setState({ userLastLocation: `${subArea}, ${res[0].adminArea}`})
      }
      )
    }
    if (friendInfo.id) {
      getFriendScore(apiAccessToken, friendInfo.id)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { apiAccessToken, userInfo, connection, friendInfo, fetching, fetchingTokens, currentFriendScore } = this.props
    const { selectedSocialMedia, selectedPlatformsUpdated } = this.state
    const componentUpdated = !fetching && !fetchingTokens && !selectedPlatformsUpdated
    const dataPresent = userInfo && userInfo.social_profiles && userInfo.social_profiles.length &&
                        friendInfo && friendInfo.social_profiles && friendInfo.social_profiles.length

    if (dataPresent && !selectedSocialMedia.length && componentUpdated && connection) {
      const nonSelectedPlatform = userInfo.social_profiles.find(profile =>
        !connection.find(connect => connect.provider === profile.provider) &&
        friendInfo.social_profiles.find(friendProf => friendProf.provider === profile.provider)
      )

      this.setState({
        selectedSocialMedia: nonSelectedPlatform ? [nonSelectedPlatform.provider] : [],
        selectedPlatformsUpdated: true
      })
    }
    if (friendInfo.id && currentFriendScore === null) {
      getFriendScore(apiAccessToken, friendInfo.id)
    }
  }

  componentWillUnmount = () => {
    this.setState(this.initialState)
  }

  renderPlatformContainer = platform => {
    const { friendInfo } = this.props

    if (platform === "camera") {
      return this.renderPictures()
    } else{
      return(
        <Animatable.View
          animation="slideInLeft"
          style={styles.scrollContainer}>
          <FeedContainer
            platform={platform}
            userId={friendInfo.id}
            friendInfo={friendInfo}
          />
        </Animatable.View>
      )
    }
  }

  handlePicturePush = (pressedPicObj, idx) => {
    this.setState({ myPicturesModalVisible: true, currentPic: pressedPicObj, currentPicIdx: idx })
  }

  toggleMyPicturesModal = () => {
    const { myPicturesModalVisible } = this.state

    this.setState({ myPicturesModalVisible: !myPicturesModalVisible })
  }

  renderPictures = () => {
    const { friendInfo } = this.props
    let mappedPictures = []

    if (friendInfo && friendInfo.pictures && friendInfo.pictures.length) {
      mappedPictures = friendInfo.pictures.map( (imageObj, idx) => {
        return(
          <TouchableOpacity
            key={imageObj.id}
            style={styles.myPicsCard}
            onPress={() => this.handlePicturePush(friendInfo.pictures, idx)}>
            <CachedImage
              style={{ width: '100%', height: 120, borderRadius: 10}}
              source={{uri: imageObj.url}}
            />
          </TouchableOpacity>
        )
      })
    } else {
      mappedPictures =
      <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems: 'center', padding: 10}}>
        <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
          Whoops! Looks this user has not set up My Pictures yet!
        </Text>
        <View style={{ padding: 20 }}>
          <Icon
            name="emoji-sad"
            type="entypo"
            size={100}
          />
        </View>
      </View>
    }

    return (
    <Animatable.View
      animation="slideInLeft"
      style={styles.socialAccountContainer}>
      {mappedPictures && mappedPictures.length ? mappedPictures.slice(0, 6) : mappedPictures}
    </Animatable.View>
    )
  }

  handlePlatformChange = platform => {
    this.setState({ feedContainer: true, platform: platform })
  }

  handleBackToProfile = () => {
    this.setState({ feedContainer: false, platform: 'profile' })
  }

  handleEmail = () => {
    // email action here - needs to be hooked up to friend/user's actual e-mail
    const { friendInfo } = this.props
    const { personal_email } = friendInfo
    if (personal_email) {
      Communications.email([personal_email], null, null, 'Subject Here', 'Message Body Here...')
    } else {
      alert(`Sorry, ${friendInfo.first_name} has not shared this information`)
    }
  }

  handleCall = () => {
    // call action here - needs to be hooked up to user phone number
    const { friendInfo } = this.props
    const { phone_number } = friendInfo

    if (phone_number) {
      const userData = {
        phoneNumbers: [{
          label: 'mobile',
          number: `${phone_number}`
        }],
        familyName: `${friendInfo.last_name}`,
        givenName: `${friendInfo.first_name}`,
      }

      ActionSheetIOS.showActionSheetWithOptions({
        options: [
          `Call ${friendInfo.first_name}`,
          `Text ${friendInfo.first_name}`,
          'Add To Contacts',
          'Cancel']
      }, (buttonIndex) => {
        if (buttonIndex === 0) {
          Communications.phonecall(`${phone_number}`, true)
        } else if (buttonIndex ===1) {
          Communications.textWithoutEncoding(`${phone_number}`, `Hey, ${friendInfo.first_name}!`)
        } else if (buttonIndex === 2) {
          Contacts.openContactForm(userData, (err) => { console.log(err)})
        }
      })
    } else {
      alert(`Sorry, ${friendInfo.first_name} has not shared this information`)
    }
  }

  socialPlatformPresent = (provider) => {
    const { platforms, userInfo } = this.props

    return userInfo.social_profiles.find(platformObj => platformObj.provider === provider)
  }

  toggleSocialMediaSelection = (platformName) => {
    const { connection } = this.props
    const { selectedSocialMedia } = this.state
    const platformIndex = selectedSocialMedia.findIndex(socialMedia => socialMedia === platformName)
    const connectionPresent = () => connection.find(platform => platform.provider === platformName)

    // temporary fix for removing facebook from flow
    const isFacebook = platformName === 'facebook'

    if (this.socialPlatformPresent(platformName) && !connectionPresent()) {
      if (platformIndex < 0) {
        this.setState({ selectedSocialMedia: [...selectedSocialMedia, platformName] })
      } else {
        const updatedSocialMediaList = [
          ...selectedSocialMedia.slice(0, platformIndex),
          ...selectedSocialMedia.slice(platformIndex + 1)
        ]

        this.setState({ selectedSocialMedia: updatedSocialMediaList })
      }
    }
  }

  getSCEligiblePlatforms = () => {
    return this.props.friendInfo &&
    this.props.friendInfo.social_profiles &&
    this.props.friendInfo.social_profiles.filter( obj =>
      obj.provider && this.socialPlatformPresent(obj.provider) &&
      !this.props.connection.find(connect => connect.provider === obj.provider)
    ) || [];
  }

  navigateToSuperConnectScreen = (platformsSelected, copy, connectType) => {
    const { navigation, setSuperConnectPlatforms, connection, userInfo, friendInfo } = this.props
    const fullyConnected =  _.intersectionBy(userInfo.social_profiles, friendInfo.social_profiles, 'provider').length === connection.length
    const isFriendthem = connectType === 'friendthem'

    if (platformsSelected.length || fullyConnected) {
      setSuperConnectPlatforms(_.sortBy(platformsSelected, ['provider']), copy)
      this.setState(this.initialState, () => navigation.navigate('SuperConnectScreen', { copy: copy, isFriendthem: isFriendthem }))
    }
  }

  closeModalNavigation = (modalName) => {
    this.setState({ [modalName]: false}, () =>
      this.props.navigation.navigate('UserProfileScreen')
    )
  }

  superConnectCallback = (platformsSelected, copy, connectType) => {
    const { userInfo } = this.props

    if (userInfo.social_profiles.length === 1 && connectType === 'superconnect') {
      this.setState({ showSuperConnectModal: true })
    } else {
      this.navigateToSuperConnectScreen(platformsSelected, copy, connectType)
    }
  }

  render() {
    const {
      connection,
      currentFriendScore,
      fetchingScore,
      friendInfo,
      navigation,
      setSuperConnectPlatforms,
      superConnect,
      userInfo,
      userId
    } = this.props

    const {
      currentPic,
      currentPicIdx,
      fetching,
      fetchingTokens,
      myPicturesModalVisible,
      platform,
      showModal,
      showTutorialModal,
      socialMediaData,
      syncedCardColors,
      selectedSocialMedia,
      showSuperConnectModal,
      userLastLocation
    } = this.state

    const socialPlatforms = friendInfo
    && friendInfo.social_profiles
    && friendInfo.social_profiles.map(prof => prof.provider)

    const ipxHeader = { 'marginTop': 60 }
    const renderIpxHeader = ifIphoneX(ipxHeader, '')

    const backAction =  NavigationActions.back()

    if(fetching || fetchingTokens){
      return(
        <View style={{height: '30%', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    // commented out while FB deeplink is functioning again
    // const superConnectPlatforms = this.getSCEligiblePlatforms().filter( socialObj => socialObj.provider !== 'facebook')

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <MyPicturesModal
            imageObjects={currentPic}
            visible={myPicturesModalVisible}
            xOffset={(1787/5) * (currentPicIdx)}
            toggle={this.toggleMyPicturesModal}
          />
          <TutorialModal
            modalVisible={showTutorialModal}
            toggleModal={() => this.setState({ showTutorialModal: !showTutorialModal})}
            buttonText={'Add Accounts'}
            tutorialCopy={"Sorry, you cannot connect with friends if you do not have any accounts synced to your profile."}
            buttonCallback={() => this.closeModalNavigation('showTutorialModal')}
            />
          <TutorialModal
            modalVisible={showSuperConnectModal}
            toggleModal={() => this.setState({ showSuperConnectModal: !showSuperConnectModal })}
            buttonText={'Add Accounts'}
            tutorialCopy={"Sorry, it is not a super connect unless you have at least 2 accounts synced to your profile. You can select the friendthem option or you can use the button below to navigate to your profile and sync more accounts."}
            buttonCallback={() => this.closeModalNavigation('showSuperConnectModal')}
          />
          <View style={styles.profile}>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
              <View style={[styles.profileHeader, renderIpxHeader]}>
                <View style={styles.backIcon}>
                  <Icon
                    name='arrow-back'
                    type='materialicons'
                    size={36}
                    color='#FFF'
                    onPress={() => navigation.dispatch(backAction) }
                  />
                </View>
                <View style={[styles.scoreContainer, { top: 0 }]}>
                { fetchingScore || currentFriendScore === null ?
                  <ActivityIndicator size='small' /> :
                  [<Image source={Images.friendthemPointsLogo} style={{height: 40, width: 40}}/>,
                  <Text style={styles.scoreText}>
                    {currentFriendScore.toLocaleString()}
                  </Text>]
                }
                </View>
                <View style={styles.profHeaderTop}>
                      <TouchableOpacity onPress={this.handleCall}>
                        <Icon
                        name='phone'
                        type='font-awesome'
                        color='#ffffff'
                        containerStyle={styles.phoneIcon}/>
                      </TouchableOpacity>
                    <CachedImage
                      style={styles.profileImage}
                      source={friendInfo.picture ? {uri: `${friendInfo.picture}`} : Images.noPicSVG} />
                        <TouchableOpacity onPress={this.handleEmail}>
                          <Icon
                            name='md-mail'
                            type='ionicon'
                            color='#ffffff'
                            containerStyle={styles.mailIcon}/>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.profileSubtext}>
                        {`${friendInfo.first_name} ${friendInfo.last_name}`}
                      </Text>
                      <Text style={styles.profileHometownText}>
                        {friendInfo.hometown}
                      </Text>
                      <View>
                        <Text numberOfLines={1} style={styles.interestsText}>
                          {friendInfo.hobbies ? friendInfo.hobbies.join(' | ') : ''}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-around'}}>
                        {
                          userLastLocation
                          ? <Icon
                              name='location'
                              type='entypo'
                              size={14}
                              color='#fff'
                            />
                          : null
                        }
                        <Text style={{ color: '#fff', fontWeight: '500', backgroundColor: 'transparent', marginLeft: 7}}>
                          {userLastLocation}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
          </View>
            <View style={styles.scrollWheelContainer}>
              <ScrollWheel
                handlePlatformChange={this.handlePlatformChange}
                handleBackToProfile={this.handleBackToProfile}
                selected={this.state.platform}
                profilePic={friendInfo.picture}
                socialPlatforms={socialPlatforms}
              />
            </View>

            { platform === 'profile' ? <View style={styles.scrollContainer}>
              <SocialMediaCardContainer
                fromFriendProfile={true}
                connection={connection}
                toggleBanner={() => console.log('') }
                friendPlatforms={friendInfo.social_profiles}
                onPressCallback={(platform) => this.toggleSocialMediaSelection(platform)}
                platformSynced={socialMedia => this.socialPlatformPresent(socialMedia)}
                platformSelected={socialMedia => selectedSocialMedia.includes(socialMedia)}
              />
              <SuperConnectBar
                setSuperConnectPlatforms={() => setSuperConnectPlatforms(selectedSocialMedia)}
                superConnect={(platforms, copy, connectType) => this.superConnectCallback(platforms, copy, connectType)}
                selected={this.state.selectedSocialMedia}
                userData={userInfo}
                platforms={this.getSCEligiblePlatforms()}
                userId={userId}
                iphoneXStyle={ifIphoneX({'top': 300}, '')}
              />
            </View> :
            <View style={styles.scrollContainer}>
             { this.renderPlatformContainer(platform) }
            </View>
           }
        </View>
    )
  }
}

const mapStateToProps = state => ({
  apiAccessToken: state.authStore.accessToken,
  connection: state.friendStore.connection,
  currentFriendScore: state.friendStore.currentFriendScore,
  fbAuthToken: state.fbStore.fbAccessToken,
  fetching: state.friendStore.fetching,
  fetchingScore: state.friendStore.fetchingScore,
  fetchingTokens: state.tokenStore.fetchingTokens,
  friendInfo: state.friendStore.friendData,
  loggedIn: state.authStore.loggedIn,
  platforms: state.tokenStore.platforms,
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
})

const mapDispatchToProps = dispatch => {
  const { logoutComplete } = FBStoreActions
  const { setSuperConnectPlatforms } = SuperConnectActions
  return {
    ...bindActionCreators({
      fbLogoutComplete: logoutComplete,
      setSuperConnectPlatforms,
      checkFriendConnection,
      getUserTokens,
      getFriendScore
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfileScreen)
