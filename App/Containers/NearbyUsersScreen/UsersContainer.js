import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import UserCard from './UserCard';
// Styles
import styles from '../Styles/UsersContainerStyles';
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard';

export default function UsersContainer(props) {
  const { users, navigation, setFriendInfo } = props
  const viewFriendProfile = userObj => {
    setFriendInfo(userObj)
    navigation.navigate('FriendProfileScreen', { })
  }

  console.log('users', users)
  const userCards =
    users.map( (userObj,i) =>
  <UserCard
    key={i}
    picture={userObj.picture}
    name={userObj.first_name}
    fbUrl={userObj.fbUrl}
    setFriendInfo={() => viewFriendProfile(userObj)}
  /> )

  return(
    <ScrollView contentContainerStyle={styles.container}>
      {userCards}
    </ScrollView>
  )
}
