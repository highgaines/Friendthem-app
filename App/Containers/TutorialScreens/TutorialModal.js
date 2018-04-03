import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import { Images } from '../../Themes'

import styles from '../Styles/TutorialScreenStyles'

export default TutorialModal = props => {
  const {
    buttonCallback,
    buttonText,
    modalVisible,
    toggleModal,
    tutorialCopy,
  } = props

  return (
      <Modal
        animationIn='slideInUp'
        animationOut='slideOutDown'
        onBackdropPress={toggleModal}
        isVisible={modalVisible}
        style={styles.tutorialModal}
      >
        <View style={styles.tutorialModalContent}>
          <Image style={styles.tutorialModalImage} source={Images.friendsterTutorialLogo}/>
          <Text style={styles.tutorialModalCopy}>{tutorialCopy}</Text>
          <TouchableOpacity onPress={buttonCallback} style={styles.tutorialModalButton}>
            <Text style={styles.tutorialModalButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  )
}
