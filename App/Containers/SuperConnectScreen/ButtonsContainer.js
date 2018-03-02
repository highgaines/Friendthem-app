import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Button, Linking } from 'react-native';
import RoundedButton from '../../Components/RoundedButton';
import { NavigationActions } from 'react-navigation';
import ConnectButton from './ConnectButton';

// Styles
import styles from '../Styles/ButtonContainerStyles';

export default ButtonsContainer = props => {
  const { friendName, deepLinkURL, navigation, friendUrlm, superConnectPromiseLoop, copy } = props
  const backAction = NavigationActions.back()

  const goBack = () => {
    navigation.dispatch(backAction)
  }

  const letsDoIt = () => {
    superConnectPromiseLoop()
  }

  return(
    <View style={styles.container}>
      <Text
        style={
          {
            color: 'white',
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'Montserrat'
          }}>
        {`${copy} ${friendName}?`}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <ConnectButton
          name='arrow-back'
          type='materialicons'
          color='#ffffff'
          title='GO BACK'
          onPressCallback={goBack}
          containerStyle={styles.button}
          linearGradient={true}
          textStyle={styles.textStyle}/>

        <ConnectButton
          name='check'
          type='entypo'
          color='#ffffff'
          onPressCallback={letsDoIt}
          title="LET'S DO IT"
          containerStyle={styles.button}
          linearGradient={true}
          textStyle={styles.textStyle}/>
      </View>
    </View>
  )
}
