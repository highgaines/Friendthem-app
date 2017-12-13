import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Linking } from 'react-native';
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserCardStyles';

export default function UserCard(props) {
  const { image, name, fbUrl } = props

  return(
    <View
      style={styles.card}
      onPress={fbUrl ? () => Linking.openURL(fbUrl) : 'google.com'}>
      <Image style={styles.cardImage} source={image} />
      <View style={styles.cardText}>
        <Text numberOfLines={1}> {name} </Text>
      </View>
    </View>
  )
}
