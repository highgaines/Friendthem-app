import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Linking } from 'react-native';
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserCardStyles';

import { LazyloadView } from 'react-native-lazyload-deux'

export default function UserCard(props) {
  const { picture, name, fbUrl, setFriendInfo } = props

  return(
    <TouchableOpacity
      style={styles.card}
      onPress={setFriendInfo}>
      <Image style={styles.cardImage} source={{uri: `${picture}`}} />
      <LazyloadView style={styles.cardText}>
        <Text
          style={{ fontFamily: 'Montserrat', fontSize: 13 }}
          numberOfLines={1}>
            {name}
        </Text>
      </LazyloadView>
    </TouchableOpacity>
  )
}
