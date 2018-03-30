import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Linking } from 'react-native'

// Libraries
import { CachedImage } from "react-native-img-cache";
import { LazyloadScrollView, LazyloadView } from 'react-native-lazyload-deux'
import * as Animatable from 'react-native-animatable'
import AndroidOpenSettings from 'react-native-android-open-settings'

// Components
import UserCard from './UserCard'
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'

// Styles
import styles from '../Styles/UsersContainerStyles'

// Images
import { Images } from '../../Themes'

// Constants
import { isAndroid } from '../../Utils/constants'

export default function UsersContainer(props) {
  const { users, navigation, locationPermission, viewFriendProfile } = props

  const userCards =
    users.map( (userObj,i) =>
      <UserCard
        key={i}
        picture={userObj.picture}
        name={userObj.first_name}
        fbUrl={userObj.fbUrl}
        setFriendInfo={() => viewFriendProfile(userObj)}
      />
    )

  const arePeopleNearby = users.length

  const buttonAction = () => {
    if (locationPermission) {
      navigation.navigate('InviteUsersScreen')
    } else {
        if (isAndroid) {
          AndroidOpenSettings.appDetailsSettings()
        } else {
            Linking.openURL('app-settings:')
        }
    }
  }

  return(
    <ScrollView contentContainerStyle={arePeopleNearby ? styles.container : [styles.container, {justifyContent: 'center'}]}>
      {
        users.length
        ? userCards
        :
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
              onPress={
                locationPermission ?
                () => navigation.navigate('InviteUsers')
                :
                () => Linking.openURL('app-settings:')
              }
              style={styles.optionButton}>
              <Text style={styles.buttonText}>
                YES, LET'S GO :)
              </Text>
            </TouchableOpacity>
          </LazyloadView>
        </Animatable.View> }
    </ScrollView>
  )
}
