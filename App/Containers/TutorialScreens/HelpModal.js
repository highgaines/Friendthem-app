import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';

// Libraries
import Modal from 'react-native-modal'

// Components
import ConnectButton from '../SuperConnectScreen/ConnectButton'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/TutorialScreenStyles';

export default HelpModal = props => {
  const { modalVisible, triggerModal, text } = props

  return (
      <Modal
        animationIn='slideInUp'
        animationOut='slideOutDown'
        onBackdropPress={triggerModal}
        isVisible={modalVisible}
        >
          <View style={styles.modal}>
              <Image
                style={{ width: 100, height: 100 }}
                source={Images.Friendster}
              />
            <Text style={styles.modalText}>
              {text}
            </Text>
            <ConnectButton
              title="CLOSE"
              containerStyle={styles.button}
              textStyle={styles.buttonTextStyle}
              onPressCallback={triggerModal}
            />
          </View>
      </Modal>
  )
}
