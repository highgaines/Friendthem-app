import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserCardStyles';

export default function UserCard(props) {
  const { image, name } = props

  return(
    <View style={styles.card}>
      <Image style={styles.cardImage} source={image} />
      <Text> {name} </Text>
    </View>
  )
}
