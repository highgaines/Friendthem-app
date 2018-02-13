import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import Image from 'react-native-remote-svg'
import UserCard from './UserCard'
// Styles
import styles from '../Styles/UsersContainerStyles'
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'
import { Images } from '../../Themes'
export default function UsersContainer(props) {
  const { users, navigation, setFriendInfo } = props
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
  /> )
  const arePeopleNearby = users.length

  return(
    <ScrollView contentContainerStyle={arePeopleNearby ? styles.container : [styles.container, {justifyContent: 'center'}]}>
      {
        users.length
        ? userCards
        : <View style={styles.noNearbyUsersContainer}>
          <Image
            source={Images.characterFriendThem}
            style={styles.mainImage}
            />
          <Text style={styles.boldMainText}>
            NO PEOPLE NEARBY?
          </Text>
          <Text style={styles.locationMessage}>
            It looks like you don't have your location services turned on.
            <Text style={styles.deepLinkText}>
              { } Jump to settings to turn on?
            </Text>
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.buttonText}>
                NO, THANKS :(
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.buttonText}>
                YES, LET'S GO :)
              </Text>
            </TouchableOpacity>
          </View>
        </View> }
    </ScrollView>
  )
}
