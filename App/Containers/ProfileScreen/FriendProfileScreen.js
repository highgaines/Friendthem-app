import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity, AppState } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import Communications from 'react-native-communications';

// Redux
import FBStoreActions from '../../Redux/FBStore';
import SuperConnectActions from '../../Redux/SuperConnectStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'

// Components
import Navbar from '../Navbar/Navbar';
import SocialMediaCardContainer from '../SocialMediaCards/SocialMediaCardContainer';
import SuperConnectBar from '../SuperConnectScreen/SuperConnectBar'
import ScrollWheel from './ScrollWheel';
import FeedContainer from '../SocialFeed/FeedContainer';

// Constants
import { SOCIAL_MEDIA_DATA, SYNCED_CARD_COLORS } from '../../Utils/constants'

// Styles
import styles from '../Styles/UserProfileStyles';


class FriendProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      platform: 'profile',
      feedContainer: false,
      socialMediaData: SOCIAL_MEDIA_DATA,
      syncedCardColors: SYNCED_CARD_COLORS,
      selectedSocialMedia: []
    }
  }

  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserId, loggedIn, getUserTokens } = this.props

    if (apiAccessToken && loggedIn) {
      getUserTokens(apiAccessToken)
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentWillUnmount = () => {
    this.setState({ showFriendster: false })
  }

  renderPlatformContainer = platform => {
      return <FeedContainer platform={platform} />
  }

  handlePlatformChange = platform => {
    this.setState({ feedContainer: true, platform: platform })
  }

  handleBackToProfile = () => {
    this.setState({ feedContainer: false, platform: 'profile' })
  }

  handleEmail = () => {
    // email action here - needs to be hooked up to friend/user's actual e-mail
    Communications.email(['naz@simplefractal.com'], null, null, 'ITS ALIVE!!!', 'my body text')
  }

  handleCall = () => {
    // call action here - needs to be hooked up to friend/user's actual phone number if they have one, otherwise this action will trigger alert?
    Communications.phonecall('3472917739', true)
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

  toggleSocialMediaSelection = (platformName) => {
    const { selectedSocialMedia } = this.state
    const platformIndex = selectedSocialMedia.findIndex(socialMedia => socialMedia === platformName)

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

  render() {
    const { friendInfo, superConnect, navigation, setSuperConnectPlatforms } = this.props;
    const { showModal, socialMediaData, syncedCardColors, selectedSocialMedia } = this.state

    return (
        <View>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
            <View style={styles.profileHeader}>
              <View style={styles.profHeaderTop}>
                <TouchableOpacity onPress={this.handleCall}>
                  <Icon
                    name='phone'
                    type='font-awesome'
                    color='#ffffff'
                    containerStyle={styles.phoneIcon}/>
                </TouchableOpacity>
                <Image
                  style={styles.profileImage}
                  source={{uri: friendInfo.picture}} />
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
              <Text style={styles.interestsText}>
                  {friendInfo.hobbies ? friendInfo.hobbies.join(' | ') : ''}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-around'}}>
                <Icon
                  name='location'
                  type='entypo'
                  size={14}
                  color='#fff'
                />
                <Text style={{ color: '#fff', fontWeight: '500', backgroundColor: 'transparent', marginLeft: 7}}>
                  {friendInfo.location}
                </Text>
              </View>
            </View>
            </LinearGradient>
            <View style={styles.scrollWheelContainer}>
              <ScrollWheel
                handlePlatformChange={this.handlePlatformChange}
                handleBackToProfile={this.handleBackToProfile}
                selected={this.state.platform}
                profilePic={friendInfo.picture}
              />
            </View>
            <SocialMediaCardContainer
              fromFriendProfile={true}
              friendPlatforms={friendInfo.social_profiles}
              onPressCallback={(platform) => this.toggleSocialMediaSelection(platform)}
              platformSynced={socialMedia => this.socialPlatformPresent(socialMedia)}
              platformSelected={socialMedia => selectedSocialMedia.includes(socialMedia)}
            />
            <SuperConnectBar
              setSuperConnectPlatforms={() => setSuperConnectPlatforms(selectedSocialMedia)}
              superConnect={superConnect}/>
            <View style={styles.superConnectBarContainer}>
            </View>
            <View>
              <Navbar
                navigation={navigation}
                navbarStyle={styles.userProfNavbar}
                openModal={this.openModal}
                logOut={this.logOut}
                current='Friends'
                margin={-88}
              />
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userData,
  friendInfo: state.friendStore.friendData,
  platforms: state.tokenStore.platforms,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  loggedIn: state.authStore.loggedIn,
  platforms: state.tokenStore.platforms,
})

const mapDispatchToProps = dispatch => {
  const { logoutComplete } = FBStoreActions
  const { setSuperConnectPlatforms } = SuperConnectActions
  return {
    ...bindActionCreators({
      fbLogoutComplete: logoutComplete,
      setSuperConnectPlatforms,
      getUserTokens,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfileScreen)
