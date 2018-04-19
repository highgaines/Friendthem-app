import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

// Libraries
import * as Animatable from 'react-native-animatable'
import { LazyloadView } from 'react-native-lazyload-deux'
import { CachedImage } from "react-native-img-cache"
import AndroidOpenSettings from 'react-native-android-open-settings'

// Styles
import styles from '../Styles/UsersContainerStyles'

// Images
import { Images } from '../../Themes'

// Constants
import { isAndroid, isIOS } from '../../Utils/constants'

export default function NoPeopleNearby({ isActiveLocation, locationPermission, navigation }) {

  const buttonAction = () => {
    if (locationPermission && isActiveLocation) {
      navigation.navigate('InviteUsers')
    } else if (!isActiveLocation && !locationPermission) {
      if (isAndroid) {
        AndroidOpenSettings.locationSourceSettings()
      } else {
        Linking.openURL('App-prefs:Privacy')
      }
    } else {
        if (isAndroid) {
          AndroidOpenSettings.appDetailsSettings()
        } else {
          Linking.openURL('app-settings:')
        }
    }
  }

  const locationPermissionStatus = () => {
    if (isActiveLocation && locationPermission) {
      return "It looks like there are no users in your area at the moment."
    } else if (!isActiveLocation && !locationPermission) {
      const locationInstruction = "It looks like you don't have your location services turned on. Click 'Let's Go' to be redirected to your settings."
      const subInstruction = isIOS ? "Then click on Privacy to get to your location setting!" : ""
      return locationInstruction + subInstruction
    } else {
      return "It looks like you haven't granted friendthem location permissions."
    }
  }

  return(
    <Animatable.View animation="fadeIn" style={styles.noNearbyUsersContainer}>
      <View style={{paddingHorizontal: '5%'}}>
        <CachedImage
          source={Images.characterFriendThem}
          style={styles.mainImage}
          />
        <Text style={styles.boldMainText}>
          NO PEOPLE NEARBY?
        </Text>
        <Text style={styles.locationMessage}>
          { locationPermissionStatus() }
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
      </View>
    </Animatable.View>
  )
}
