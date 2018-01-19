import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

import ConnectButton from '../SuperConnectScreen/ConnectButton'
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard'
import Navbar from '../Navbar/Navbar'

import styles from '../Styles/UserProfileStyles'

class UserProfileScreen extends Component {
  render() {
    const { userInfo, userInterests, userLocation, navigation } = this.props
    return (
        <View>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}>
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
                userName={userInfo.name}
                inverted={false} />
            </View>
            <View>
              <Navbar
                navbarStyle={styles.userProfNavbar}
                navigation={navigation}
                margin={150}
              />
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userFbData,
  userInterests: state.userStore.interests,
  userLocation: state.userStore.location,
  fbAuthToken: state.fbStore.fbAccessToken
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
