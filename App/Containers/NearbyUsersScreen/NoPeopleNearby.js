import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

// Libraries
import * as Animatable from 'react-native-animtable'
import { LazyloadView } from 'react-native-lazyload-deux'
import { CachedImage } from "react-native-img-cache"
import AndroidOpenSettings from 'react-native-android-open-settings'

// Styles
import styles from '../Styles/UsersContainerStyles'

export default function NoPeopleNearby({ locationPermission, navigation}) {

  const buttonAction = () => {
    if (locationPermission) {
      navigation.navigate('InviteUsers')
    } else {
        if (isAndroid) {
          AndroidOpenSettings.appDetailsSettings()
        } else {
          Linking.openURL('app-settings:')
        }
    }
  }

  return(
    <Animatable.View animation="fadeIn" style={styles.noNearbyUsersContainer}>
      <CachedImage
        source={Images.characterFriendThem}
        style={styles.mainImage}
        />
      <Text style={styles.boldMainText}>
        NO PEOPLE NEARBY?
      </Text>
      <Text style={styles.locationMessage}>
        {
          locationPermission ?
          "It looks like there are no users in your area at the moment."
          :
          "It looks like you don't have your location services turned on."
        }
        <Text style={styles.deepLinkText}>
          { } {locationPermission ? "Invite someone to try Friendthem?" : "Jump to settings to turn on?"}
        </Text>
      </Text>
      <LazyloadView style={styles.buttonGroup}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.buttonText}>
            NO, THANKS :(
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={buttonAction}
          style={styles.optionButton}>
          <Text style={styles.buttonText}>
            YES, LET'S GO :)
          </Text>
        </TouchableOpacity>
      </LazyloadView>
    </Animatable.View>
  )
}
