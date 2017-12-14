import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Linking } from 'react-native';
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserCardStyles';

export default function UserCard(props) {
  const { image, name, fbUrl, setFriendInfo } = props

  return(
    <TouchableOpacity
      style={styles.card}
      onPress={setFriendInfo}>
      <Image style={styles.cardImage} source={image} />
      <View style={styles.cardText}>
        <Text numberOfLines={1}> {name} </Text>
      </View>
    </TouchableOpacity>
  )
}
