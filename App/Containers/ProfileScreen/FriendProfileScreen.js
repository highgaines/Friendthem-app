import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity, AppState, ActionSheetIOS } from 'react-native'

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

// Redux
import FBStoreActions from '../../Redux/FBStore'
import SuperConnectActions from '../../Redux/SuperConnectStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'
import FriendStoreActions, { checkFriendConnection } from '../../Redux/FriendStore'

// Components
import Navbar from '../Navbar/Navbar'
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer'
import SuperConnectBar from '../SuperConnectScreen/SuperConnectBar'
import ScrollWheel from './ScrollWheel'
import FeedContainer from '../SocialFeed/FeedContainer'
import MyPicturesModal from './MyPicturesModal'
import * as Animatable from 'react-native-animatable'

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
      selectedPlatformsUpdated: false
    }

    this.initialState = this.state
  }

  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserInfo, loggedIn, getUserTokens, setSuperConnectPlatforms } = this.props

    if (apiAccessToken && loggedIn) {
      getUserTokens(apiAccessToken)
      setSuperConnectPlatforms([])
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentDidMount = () => {
    const { apiAccessToken, friendInfo, checkFriendConnection, loggedIn, getMyPics } = this.props
    const { last_location } = friendInfo

    if (apiAccessToken && loggedIn) {
      checkFriendConnection(apiAccessToken, friendInfo.id)
    }
    if (last_location) {
      Geocoder.geocodePosition(last_location).then(res =>
        this.setState({ userLastLocation: `${res[0].subAdminArea}, ${res[0].adminArea}`})
      )
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { userInfo, connection, friendInfo, fetching, fetchingTokens } = this.props
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

  navigateToSuperConnectScreen = (platformsSelected, copy) => {
    const { navigation, setSuperConnectPlatforms, connection, userInfo, friendInfo } = this.props
    const fullyConnected = !_.difference(
      friendInfo.social_profiles.map(prof => prof.provider).asMutable(),
      connection.map(prof => prof.provider).asMutable()).length

    if (platformsSelected.length || fullyConnected) {
      setSuperConnectPlatforms(_.sortBy(platformsSelected, ['provider']), copy)
      this.setState(this.initialState, () => navigation.navigate('SuperConnectScreen', { copy: copy }))
    }
  }

  render() {
    const { friendInfo, connection, superConnect, navigation, setSuperConnectPlatforms, userInfo, userId } = this.props

    const {
      showModal,
      socialMediaData,
      syncedCardColors,
      selectedSocialMedia,
      platform,
      currentPic,
      currentPicIdx,
      myPicturesModalVisible,
      userLastLocation
    } = this.state

    const socialPlatforms = friendInfo
    && friendInfo.social_profiles
    && friendInfo.social_profiles.map(prof => prof.provider)

    const ipxHeader = { 'marginTop': 60 }
    const renderIpxHeader = ifIphoneX(ipxHeader, '')

    const backAction =  NavigationActions.back()

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <MyPicturesModal
            imageObjects={currentPic}
            visible={myPicturesModalVisible}
            xOffset={(1787/5) * (currentPicIdx)}
            toggle={this.toggleMyPicturesModal}
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
                      <Text style={styles.interestsText}>
                        {friendInfo.hobbies ? friendInfo.hobbies.join(' | ') : ''}
                      </Text>
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
                superConnect={(platformsSelected, copy) => this.navigateToSuperConnectScreen(platformsSelected, copy)}
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
  userInfo: state.userStore.userData,
  userId: state.userStore.userId,
  friendInfo: state.friendStore.friendData,
  platforms: state.tokenStore.platforms,
  connection: state.friendStore.connection,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  loggedIn: state.authStore.loggedIn,
  platforms: state.tokenStore.platforms,
  fetching: state.friendStore.fetching,
  fetchingTokens: state.tokenStore.fetchingTokens
})

const mapDispatchToProps = dispatch => {
  const { logoutComplete } = FBStoreActions
  const { setSuperConnectPlatforms } = SuperConnectActions
  return {
    ...bindActionCreators({
      fbLogoutComplete: logoutComplete,
      setSuperConnectPlatforms,
      checkFriendConnection,
      getUserTokens
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfileScreen)
