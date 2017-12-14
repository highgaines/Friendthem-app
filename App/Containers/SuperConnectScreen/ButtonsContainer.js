import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Button, Linking } from 'react-native';
import RoundedButton from '../../Components/RoundedButton';
import { NavigationActions } from 'react-navigation';

// Styles
import styles from '../Styles/ButtonContainerStyles';

export default ButtonsContainer = props => {
  const { friendName, deepLinkURL, navigation } = props
  const backAction = NavigationActions.back()

  const goBack = () => {
    navigation.dispatch(backAction)
  }

  const letsDoIt = () => {
    Linking.openUrl(deepLinkURL)
  }

  return(
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 15}}>
        {`Are you sure you want to super connect with ${friendName}?`}
      </Text>
      <View style={{ flexDirection: 'row', alignContent: 'center'}}>

      </View>
    </View>
  )
}
