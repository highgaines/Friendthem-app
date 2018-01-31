import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

// Libraries
import Modal from 'react-native-modal'
import Image from 'react-native-remote-svg';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/TutorialScreenStyles';

export default PickSocialMediaModal = props => {
  const { showModal, triggerModal } = props

  return (
      <Modal
        visible={showModal}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        onBackdropPress={triggerModal}
        >
          <View style={styles.modal}>
              <Image
                width={20}
                height={20}
                source={Images.Friendster}
              />
            <Text style={styles.modalText}>
              My name is Friendster and I'm here to help you get the most out of the app! Let's get you started by syncing up all your social media accounts.
            </Text>
            <Button title="CLOSE" onPress={triggerModal}/>
          </View>
      </Modal>
  )
}
