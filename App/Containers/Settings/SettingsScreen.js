import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity, Switch } from 'react-native'

// Librarires
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import Communications from 'react-native-communications';

// Redux
import FBStoreActions from '../../Redux/FBStore';

// Components
import ConnectButton from '../SuperConnectScreen/ConnectButton'
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard'
import Navbar from '../Navbar/Navbar'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/SettingsStyles'

class SettingsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      silenceSwitch: false,
      ghostSwitch: false
    }
  }
  logOut = () => {
    const { toggleModal, fbLogoutComplete, navigation } = this.props

    toggleModal()
    LoginManager.logOut();
    fbLogoutComplete()
    navigation.navigate('LaunchScreen')
  }

  handleReportProblem = () => {
    Communications.email(['customerservice@friendthem.com'], null, null, 'Report A Problem', 'Please explain your problem here...')
  }

  toggleSilenceNotification = () => {
    const { silenceSwitch } = this.state
    this.setState({ silenceSwitch: !silenceSwitch})//, () => silenceNotifications( !silenceSwitch ))
  }

  toggleGhostMode = () => {
    const { ghostSwitch } = this.state
    this.setState({ ghostSwitch: !ghostSwitch })//, () => ghostMode(!ghostSwitch))
  }

  render() {
    const { navigation, toggleModal } = this.props
    const { silenceSwitch, ghostSwitch } = this.state

    return (
        <View style={styles.container}>
          <LinearGradient
            style={styles.linearGradient}
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
            <View style={styles.topHeader}>
              <TouchableOpacity style={styles.backArrow}>
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
              General Setting
            </Text>
          </View>
          <TouchableOpacity style={styles.sectionItem}>
            <Image
              source={Images.person}
              />
            <Text style={styles.sectionItemText}>
              Account
            </Text>
            <Image
              source={Images.rightArrow}
              style={styles.rightArrow}
              />
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.sectionItem}>
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
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              Application Settings
            </Text>
          </View>
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
          <TouchableOpacity style={styles.sectionItem}>
            <Image
              source={Images.privacy}
              />
            <Text style={styles.sectionItemText}>
              Account Privacy
            </Text>
            <Image
              source={Images.rightArrow}
              style={styles.rightArrow}
              />
          </TouchableOpacity>
          <TouchableOpacity
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
          <Navbar
            navbarStyle={styles.userProfNavbar}
            navigation={navigation}
            current="Settings"
            margin={150}
          />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
  return {
    fbLogoutComplete: () => dispatch(FBStoreActions.logoutComplete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
