import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import UserCard from './UserCard';
// Styles
import styles from '../Styles/UsersContainerStyles';

export default function UsersContainer(props) {
  const { users } = props
  const userCards = users.map( (userObj,i) => <UserCard key={i} style={styles.userCard} image={userObj.image} name={userObj.name}/> )

  return(
    <View style={styles.usersContainer}>
      {userCards}
    </View>
  )
}
