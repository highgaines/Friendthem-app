import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import UserCard from './UserCard';
// Styles
import styles from '../Styles/UsersContainerStyles';
import SocialMediaCard from '../SuperConnectScreen/SocialMediaCard';

export default function UsersContainer(props) {
  const { users, navigation, setFriendInfo } = props
  const viewFriendProfile = userObj => {
    setFriendInfo(userObj)
    navigation.navigate('FriendProfileScreen', {
      superConnect: () => navigation.navigate('SuperConnectScreen')
    })
  }
  const userCards =
    users.map( (userObj,i) =>
  <UserCard
    key={i}
    image={userObj.image}
    name={userObj.name}
    fbUrl={userObj.fbUrl}
    setFriendInfo={() => viewFriendProfile(userObj)}
  /> )

  return(
    <ScrollView contentContainerStyle={styles.container}>
      {userCards}
      <SocialMediaCard platformName="facebook" userName="mega0319" />
      <SocialMediaCard platformName="twitter" userName="mega0319" />
    </ScrollView>
  )
}
