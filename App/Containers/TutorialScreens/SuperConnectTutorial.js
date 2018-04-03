import React, { Component } from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native'

import { Images } from '../../Themes'

import styles from '../Styles/TutorialScreenStyles'

export default SuperConnectTutorial = props => {
  const { onPressFunction, tutorialIndex } = props
  const { scTutorialOne, scTutorialTwo } = Images

  const imgSource = !tutorialIndex ? scTutorialOne : scTutorialTwo

  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={styles.tutorialContainer}>
      <Image source={imgSource} style={styles.tutorialBackgroundImage}/>
    </TouchableOpacity>
  )
}
