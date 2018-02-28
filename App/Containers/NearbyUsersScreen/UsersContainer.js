import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Linking } from 'react-native'
import Image from 'react-native-remote-svg'
import UserCard from './UserCard'
// Styles
import styles from '../Styles/UsersContainerStyles'
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'
import { Images } from '../../Themes'
import { LazyloadScrollView, LazyloadView, lazy } from 'react-native-lazyload-deux'

export default function UsersContainer(props) {
  const { users, navigation, setFriendInfo, locationPermission } = props
  const viewFriendProfile = userObj => {
    setFriendInfo(userObj)
    navigation.navigate('FriendProfileScreen', { })
  }

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
        Linking.openURL('app-settings:')
    }
  }

  return(
    <LazyloadScrollView contentContainerStyle={arePeopleNearby ? styles.container : [styles.container, {justifyContent: 'center'}]}>
      {
        users.length
        ? userCards
        :
        <LazyloadView style={styles.noNearbyUsersContainer}>
          <Image
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
        </LazyloadView> }
    </LazyloadScrollView>
  )
}
