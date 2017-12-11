import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import UserCard from './UserCard';
// Styles
import styles from '../Styles/UsersContainerStyles';

export default function UsersContainer(props) {
  const { users } = this.props
  const userCards = users.map( userObj => <UserCard image={userObj.image} name={userObj.name}/> )

  return(
    <View style={styles.usersContainer}>
      {userCards}
    </View>
  )
}
