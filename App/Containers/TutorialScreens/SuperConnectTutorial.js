import React, { Component } from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native'

import styles from '../Styles/TutorialScreenStyles'

export default SuperConnectTutorial = props => {
  const { onPressFunction, bgImage } = props

  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={styles.tutorialContainer}>
      <Image source={bgImage} style={styles.tutorialBackgroundImage}/>
    </TouchableOpacity>
  )
}
