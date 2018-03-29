import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Linking, Image } from 'react-native';

// Libraries
import { CachedImage } from "react-native-img-cache"
import { LazyloadView } from 'react-native-lazyload-deux'

// Components
import ImageCircle from '../UtilityComponents/ImageCircle'

// Styles
import styles from '../Styles/UserCardStyles'

// Images
import { Images } from '../../Themes'

export default function UserCard(props) {
  const { picture, name, fbUrl, setFriendInfo } = props

  return(
    <TouchableOpacity
      style={styles.card}
      onPress={setFriendInfo}>
      <ImageCircle
        size={95}
        source={picture}
      />
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
