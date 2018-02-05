import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-remote-svg';
import { Images } from '../../Themes';
// Styles
import styles from '../Styles/CongratulatoryScreenStyles';

export default CongratulatoryScreen = props => {
  const { userInfo,friendInfo, navigation } = props;
  const fullFriendName = `${friendInfo.first_name} ${friendInfo.last_name}`
  const handleNavigation = () => {
    navigation.navigate('UserProfileScreen')
  }

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
              <View style={styles.okButton}>
              <TouchableOpacity style={styles.button} onPress={handleNavigation} title="OK">
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                {`< Home`}
              </Text>
              </TouchableOpacity>
              </View>
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
          <Image style={styles.image2} source={{uri: friendInfo.picture}}/>
          <Image style={styles.image1} source={{uri: userInfo.picture}}/>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.superConnectSubtext}>
            {`Do you want to connect with ${fullFriendName} on Snapchat?`}
          </Text>
          <TouchableOpacity
            style={styles.snapChatConnectButton}>
            <Text style={styles.snapchatButtonText}>
              Open Snapchat
            </Text>
            <Image
              style={styles.snapChatLogo}
              source={Images.snapChatLogo}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
