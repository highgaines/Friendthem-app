import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

import styles from '../Styles/SuperConnectBarStyles';

export default function ConnectButton(props) {
  const {
    name,
    type,
    title,
    color,
    textStyle,
    iconStyle,
    containerStyle,
    linearGradient,
    onPressCallback,
  } = props;

  return linearGradient ? (
    <TouchableHighlight
      onPress={onPressCallback}
      style={containerStyle}>
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
        style={styles.linearGradient}>
        <View style={styles.buttonViewStyle}>
          <Icon
            name={name}
            type={type}
            color={color}
            containerStyle={styles.buttonIconStyle} />
          <Text style={textStyle}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableHighlight>
  )
  :
  (
    <TouchableHighlight
      onPress={onPressCallback}
      style={containerStyle}>
      <View style={styles.buttonViewStyle}>
        <Icon
          name={name}
          type={type}
          color={color}
          containerStyle={styles.buttonIconStyle} />
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}
