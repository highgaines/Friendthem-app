import React, { Component } from 'react';
import { View, Modal, Text, Button, TouchableOpacity } from 'react-native';

// Libraries
import Image from 'react-native-remote-svg';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/TutorialScreenStyles';

export default PickSocialMediaModal = props => {
  const { showModal, triggerModal } = props

  return (
    <View>
      <Modal
        transparent={true}
        visible={showModal}
        animationType='fade'
        >
          <View style={styles.modal}>
            <Image
              width={80}
              height={80}
              source={Images.friendster}
            />
            <Text style={styles.modalText}>
              My name is Friendster and I'm here to help you get the most out of the app! Let's get you started by syncing up all your social media accounts.
            </Text>
            <Button title="CLOSE" onPress={triggerModal}/>
          </View>

      </Modal>
    </View>
  )
}
