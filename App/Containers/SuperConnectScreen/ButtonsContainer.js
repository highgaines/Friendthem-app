import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export default ButtonsContainer = props => {
  const { friendName } = props

  const GoBack = () => {
    console.log('going back')
  }

  const LetsDoIt = () => {
    console.log('doing it')
  }

  return(
    <View style={{ padding: 30,
      width: 300, height: 150, backgroundColor: 'blue' }}>
      <Text style={{ color: 'white', fontSize: 15}}>
        {`Are you sure you want to super connect with ${friendName}?`}
      </Text>
      <Button onPress={GoBack} title="GO BACK"/>
      <Button onPress={LetsDoIt} title="LETS DO IT"/>
    </View>
  )
}
