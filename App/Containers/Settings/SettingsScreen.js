import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, Switch } from 'react-native'

// Librarires
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import Communications from 'react-native-communications'
import Modal from 'react-native-modal'
import { NavigationActions } from 'react-navigation'

// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FBStoreActions, { fbLogoutComplete } from '../../Redux/FBStore'
import UserStoreActions, { updateSettings, getUserInfo } from '../../Redux/UserStore'

// Components
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'
import Navbar from '../Navbar/Navbar'

// Images
import { Images } from '../../Themes'

// Constants
import { TERMS_AND_CONDITIONS } from '../../Utils/legal'

// Styles
import styles from '../Styles/SettingsStyles'

class SettingsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      silenceSwitch: props.userInfo.notifications,
      ghostSwitch: props.userInfo.ghost_mode,
      termsVisible: false
    }
  }

  componentDidMount = () => {
    const { getUserInfo, accessToken } = this.props
    getUserInfo(accessToken)
  }

  logOut = () => {
    const { toggleModal, fbLogoutComplete, navigation } = this.props

    toggleModal()
    LoginManager.logOut()
    fbLogoutComplete()
    navigation.navigate('LaunchScreen')
  }

  handleReportProblem = () => {
    Communications.email(['customerservice@friendthem.com'], null, null, 'Report A Problem', 'Please explain your problem here...')
  }

  handleSuggestion = () => {
    Communications.email(['suggestions@friendthem.com'], null, null, 'Offer A Suggestion', 'Please give us some detailed feedback on how we can make our app better here...')
  }

  toggleSilenceNotification = () => {
    const { silenceSwitch } = this.state
    const { updateSettings, accessToken } = this.props

    this.setState(
      { silenceSwitch: !silenceSwitch},
      () => updateSettings(accessToken, 'notifications', !silenceSwitch)
    )
  }

  toggleGhostMode = () => {
    const { ghostSwitch } = this.state
    const { updateSettings, accessToken } = this.props

    this.setState(
      { ghostSwitch: !ghostSwitch },
      () => updateSettings(accessToken, 'ghost_mode', !ghostSwitch)
    )
  }

  toggleTNCModal = () => {
    const { termsVisible } = this.state
    this.setState({ termsVisible: !termsVisible})
  }

  render() {
    const { navigation, toggleModal } = this.props
    const { silenceSwitch, ghostSwitch, termsVisible } = this.state
    const backAction =  NavigationActions.back()
    return (
        <View style={styles.container}>
          <LinearGradient
            style={styles.linearGradient}
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
            <View style={styles.topHeader}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(backAction)}
                style={styles.backArrow}>
                <Image
                  source={Images.backArrow}
                  />
              </TouchableOpacity>
              <Text style={styles.titleText}>
                Settings
              </Text>
            </View>
          </LinearGradient>
          <ScrollView style={styles.scrollView}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              General Settings
            </Text>
          </View>
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={this.toggleTNCModal}
            isVisible={termsVisible}
          >
            <View style={{ flex: 1 }}>
              <ScrollView
                testID='terms-and-conditions'
                contentContainerStyle={styles.containerModal}>
                <Text style={{ fontSize: 6 }}>
                  {TERMS_AND_CONDITIONS}
                </Text>
              </ScrollView>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={this.handleReportProblem}
            >
            <Image
              source={Images.danger}
              />
            <Text style={styles.sectionItemText}>
              Report a Problem
            </Text>
            <Image
              source={Images.rightArrow}
              style={styles.rightArrow}
              />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={this.handleSuggestion}
            >
            <Image
              source={Images.lightbulbPNG}
            />
            <Text style={styles.sectionItemText}>
              Offer a Suggestion
            </Text>
            <Image
              source={Images.rightArrow}
              style={styles.rightArrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={this.toggleTNCModal}
            testID='terms-and-conditions-button'
            >
            <Image
              source={Images.file}
              />
            <Text style={styles.sectionItemText}>
              Terms and Conditions
            </Text>
            <Image
              source={Images.rightArrow}
              style={styles.rightArrow}
              />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Image
              source={Images.inclinedBell}
              />
            <Text style={styles.sectionItemText}>
              Silence Notifications
            </Text>
            <Switch
              onTintColor='#f6385e'
              onValueChange={this.toggleSilenceNotification}
              value={silenceSwitch}
              style={styles.switchStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}>
            <Image
              source={Images.ghost}
              />
            <Text style={styles.sectionItemText}>
              Ghost Mode
            </Text>
            <Switch
              onTintColor='#f6385e'
              onValueChange={this.toggleGhostMode}
              value={ghostSwitch}
              style={styles.ghostSwitchStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID={'logout_button'}
            style={styles.logOutButton}
            onPress={() => toggleModal()}
            >
            <Image
              source={Images.powerIcon}
              />
            <Text style={styles.logOutText}>
              LOG OUT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.authStore.accessToken,
  userInfo: state.userStore.userData,
  notifications: state.userStore.notificationsOn
})

const mapDispatchToProps = dispatch => {
  const { fbLogoutComplete } = FBStoreActions

  return {
    ...bindActionCreators({ fbLogoutComplete, updateSettings, getUserInfo }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
