import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from '../Styles/SuperConnectBarStyles';

export default function ConnectButton(props) {
  const {
    name,
    type,
    title,
    color,
    iconStyle,
    containerStyle,
    onPressCallback
  } = props;

  return (
    <TouchableHighlight
      onPress={onPressCallback}
      style={containerStyle}>
      <View style={styles.buttonViewStyle}>
        <Icon
          name={name}
          type={type}
          color={color}
          containerStyle={styles.buttonIconStyle} />
        <Text style={styles.buttonTextStyle}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}
