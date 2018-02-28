import React from 'react';
import { TouchableOpacity, Text, Image, Modal, View } from 'react-native';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/TutorialScreenStyles';

export default WelcomeScreen = props => {
  const { name, closeModal, visible, navigation } = props

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => closeModal()}
        >
          <View style={styles.modalContainer}>
            <Image
              source={Images.friendster}
            />
            <Text style={[styles.text, { fontSize: 15}]}> Welcome to Friendthem! </Text>
            <Text style={[styles.text, { fontSize: 12, textAlign: 'center'}]}> Let's get you started by syncing up all your social media accounts</Text>
            <TouchableOpacity
              testID='start-button'
              style={styles.startButton}
              onPress={() => {
                closeModal()
                navigation.navigate('UserProfileScreen')
              }}>
              <Text
                style={[styles.text, { textAlign: 'center'}]}> START </Text>
            </TouchableOpacity>
          </View>
        </Modal>
    </View>
  )
}
