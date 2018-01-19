import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, Text, Image, View, Button, Linking } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

// Libraries
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard'
import Navbar from '../Navbar/Navbar'
import PickSocialMediaModal from '../TutorialScreens/PickSocialMediaModal'
import AuthStoreActions, { socialMediaAuth } from '../../Redux/AuthStore'
import UserStoreActions, { getUserId } from '../../Redux/UserStore'
import TokenStoreActions, { getUserTokens } from '../../Redux/TokenRedux'

// Styles
import styles from '../Styles/UserProfileStyles'

class UserProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFriendster: true
    }
  }

  triggerFriendster = () => {
    const { showFriendster } = this.state
    this.setState({ showFriendster: !showFriendster })
  }

  componentWillMount = () => {
    const { apiAccessToken, navigation, getUserId } = this.props

    if (apiAccessToken) {
      getUserId(apiAccessToken)
    } else {
      navigation.navigate('LaunchScreen')
    }
  }

  componentWillUpdate = nextProps => {
    const { needsFetchTokens, getUserTokens, apiAccessToken } = this.props

    if (!needsFetchTokens && nextProps.needsFetchTokens) {
      getUserTokens(apiAccessToken)
    }
  }

  componentDidUpdate = prevProps => {
    const { authRedirectUrl } = this.props
    if (authRedirectUrl && !prevProps.authRedirectUrl) {
      Linking.openURL(authRedirectUrl)
    }
  }

  authenticateSocialMedia = platform => {
    this.props.socialMediaAuth(platform, this.props.userId)
  }

  render() {
    const {
      userId,
      userInfo,
      userInterests,
      userLocation,
      navigation,
      apiAccessToken,
      getUserId,
      socialMediaAuth,
      getUserTokens
    } = this.props
    const { showFriendster } = this.state

    return (
        <View style={showFriendster ? { opacity: 0.3 } : ''}>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
          <PickSocialMediaModal
            triggerModal={this.triggerFriendster}
            showModal={showFriendster}
          />
            <View style={styles.profileHeader}>
              <View style={styles.profHeaderTop}>
                <Image
                  style={styles.profileImage}
                  source={{uri: `${userInfo.picture.data.url}`}} />
              </View>
              <Text style={styles.profileSubtext}>
              {`${userInfo.name}`}
              </Text>
              <Text style={styles.interestsText}>
                  {userInterests.join(' | ')}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 7, justifyContent: 'space-around'}}>
                <Icon
                  name='location'
                  type='entypo'
                  size={14}
                  color='#fff'
                />
                <Text style={{ color: '#fff', fontWeight: '500', backgroundColor: 'transparent', marginLeft: 7}}>
                  {userLocation}
                </Text>
              </View>
              <ConnectButton
                color='#fff'
                title='EDIT PROFILE'
                containerStyle={styles.button}
                textStyle={styles.buttonTextStyle}
                onPressCallback={() => navigation.navigate('EditProfileInfoScreen')}
              />
            </View>
            </LinearGradient>
            <View style={styles.socialIconSlider}>

            </View>
            <View style={styles.socialAccountContainer}>
              <SocialMediaCard
                platformName='Facebook'
                socialAuth={socialMediaAuth}
                userName={userInfo.name}
                platformAuth={'facebook'}
                inverted={false} />
              <SocialMediaCard
                platformName='Instagram'
                userName={userInfo.name}
                socialAuth={this.authenticateSocialMedia}
                platformAuth={'instagram'}
                inverted={true} />
              <SocialMediaCard
                platformName='Twitter'
                socialAuth={this.authenticateSocialMedia}
                userName={userInfo.name}
                platformAuth={'twitter'}
                inverted={true} />
              <SocialMediaCard
                platformName='LinkedIn'
                socialAuth={this.authenticateSocialMedia}
                userName={userInfo.name}
                platformAuth={'linkedin-oauth2'}
                inverted={true} />
            </View>
            <View>
              <Navbar
                navbarStyle={styles.userProfNavbar}
                navigation={navigation}
                current='Profile'
                margin={207}
              />
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.userStore.userId,
  userInfo: state.userStore.userData,
  userInterests: state.userStore.interests,
  userLocation: state.userStore.location,
  fbAuthToken: state.fbStore.fbAccessToken,
  apiAccessToken: state.authStore.accessToken,
  platforms: state.tokenStore.platforms,
  needsFetchTokens: state.tokenStore.needsFetchTokens,
  authRedirectUrl: state.tokenStore.authRedirectUrl
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      getUserId,
      socialMediaAuth,
      getUserTokens
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
