import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, Modal, View, Button, TouchableOpacity } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import Communications from 'react-native-communications';

// Redux
import FBStoreActions from '../../Redux/FBStore';

// Components
import Navbar from '../Navbar/Navbar';
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard';
import SuperConnectBar from '../SuperConnectScreen/SuperConnectBar'
import ScrollWheel from './ScrollWheel';

// Styles
import styles from '../Styles/UserProfileStyles';

class FriendProfileScreen extends Component {
  constructor() {
    super()

    this.state = {
      showModal: false
    }
  }

  handleEmail = () => {
    // email action here - needs to be hooked up to friend/user's actual e-mail
    Communications.email(['naz@simplefractal.com'], null, null, 'ITS ALIVE!!!', 'my body text')
  }

  handleCall = () => {
    // call action here - needs to be hooked up to friend/user's actual phone number if they have one, otherwise this action will trigger alert?
    Communications.phonecall('3472917739', true)
  }

  render() {
    const { friendInfo, superConnect, navigation } = this.props;
    const { showModal } = this.state

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
                  source={{uri: friendInfo.image}} />
                  <TouchableOpacity onPress={this.handleEmail}>
                    <Icon
                      name='md-mail'
                      type='ionicon'
                      color='#ffffff'
                      containerStyle={styles.mailIcon}/>
                  </TouchableOpacity>
              </View>
              <Text style={styles.profileSubtext}>
              {`${friendInfo.name}`}
              </Text>
              <Text style={styles.interestsText}>
                  {friendInfo.interests.join(' | ')}
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
              <ScrollWheel />
            </View>
            <View style={styles.socialAccountContainer}>
              <SocialMediaCard
                platformName='Facebook'
                inverted={true}
                userName={friendInfo.name} />
            </View>
            <View style={styles.superConnectBarContainer}>
              <SuperConnectBar
                superConnect={superConnect}/>
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
  friendInfo: state.friendStore.friendData
})

const mapDispatchToProps = dispatch => {
  return {
    fbLogoutComplete: () => dispatch(FBStoreActions.logoutComplete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfileScreen)
