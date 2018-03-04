import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Linking, Image } from 'react-native';

// Libraries
import { CachedImage } from "react-native-img-cache";
import { LazyloadView } from 'react-native-lazyload-deux'

// Styles
import styles from '../Styles/UserCardStyles';

// Images
import { Images } from '../../Themes';

export default function UserCard(props) {
  const { picture, name, fbUrl, setFriendInfo } = props

  return(
    <TouchableOpacity
      style={styles.card}
      onPress={setFriendInfo}>
      <CachedImage
        style={styles.cardImage}
        mutable
        source={picture ? {uri: `${picture}`} : Images.noPicSVG}
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
