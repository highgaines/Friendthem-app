import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Button } from 'react-native';

// Libraries
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-remote-svg';
import { Icon } from 'react-native-elements'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/CongratulatoryScreenStyles';
import { determineImage } from '../../Utils/constants'

export default CongratulatoryScreen = props => {
  const { userInfo,friendInfo, navigation, setFriendInfo, updateConnectionInfo, loadConnectivityData, updateFriendData } = props
  const fullFriendName = `${friendInfo.first_name} ${friendInfo.last_name}`
  const handleNavigation = () => {
    updateConnectionInfo()
    updateFriendData()
    setFriendInfo(friendInfo)
    navigation.pop(2)
  }

  const snapHandlePresent = social_profiles => {
    return !!social_profiles.find(profile => profile.provider === 'snapchat')
  }

  const displaySnapButton = snapHandlePresent(userInfo.social_profiles) &&
  snapHandlePresent(friendInfo.social_profiles)

  return(
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.linearGradient}
          >
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.superConnectText}> Super Connect </Text>
              </View>

            </View>

          </LinearGradient>
      </View>

      <View style={styles.body}>

        <View style={styles.message}>
          <Text
            style={
              {
                fontSize: 25,
                fontWeight: 'bold',
                fontFamily: 'Montserrat'
              }}> Congratulations! </Text>
          <Text style={styles.subMessage}>
            {`You have Super Connected with ${fullFriendName}`}
          </Text>
        </View>

        <View style={styles.imgOverlapContainer}>
          <View style={styles.background1}>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
              style={styles.linearGradientBackground}
            />
          </View>
          <View style={styles.background2}>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
              style={styles.linearGradientBackground2}
            />
          </View>
          <View style={styles.background3}>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
              style={styles.linearGradientBackground3}
            />
          </View>
          <View style={styles.background4}>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
              style={styles.linearGradientBackground4}
            />
          </View>
          <Image style={styles.image2} source={determineImage(friendInfo)}/>
          {
            userInfo.picture ?
            <Image style={styles.image1} source={userInfo.picture ? {uri: `${userInfo.picture}`} : Images.noPicSVG} />
            :
            <Icon
            containerStyle={styles.image1}
            name='ios-person'
            type='ionicon'
            size={115}
            color='#000' />
          }
        </View>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={handleNavigation}>
          <Text style={styles.connectButtonText}>
            Back To Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
