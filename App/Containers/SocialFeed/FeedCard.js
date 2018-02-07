import React, { Component } from 'react';

// Native
import { Text, View, Linking, TouchableOpacity } from 'react-native';

// Libraries
import { Icon } from 'react-native-elements';
import Image from 'react-native-remote-svg';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedCardStyles';

export default FeedCard = props => {

  return(
    <View style={styles.cardContainer}>
      <Text> {props.description} </Text>
      <Text> {props.date} </Text>
      <Text> {`${props.numLikes} likes`} </Text>
      <Text> {props.platform} </Text>
    </View>
  )
}
