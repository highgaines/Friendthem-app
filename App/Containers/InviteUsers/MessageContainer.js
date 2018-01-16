import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

// Styles
import styles from '../Styles/MessageContainerStyles';

// Child Components
import ConnectButton from '../SuperConnectScreen/ConnectButton';
import ImageCircle from '../UtilityComponents/ImageCircle';

export default MessageContainer = props => {

  const handleSend = () => {
    console.log('handling send')
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <ImageCircle
          source={'https://static.comicvine.com/uploads/scale_small/11/113509/4693444-6164752601-ben_a.jpg'}
          size={100}
        />
        <Text style={styles.firstRowText}>
          Invite friends to fill out their super profile
        </Text>
      </View>
      <View style={styles.secondRow}>
        <Text>
          Write a personal message to make sure you're connected with all your friends here
        </Text>
      </View>
      <View style={styles.thirdRow}>
        <ConnectButton
          title="Send"
          color="#fff"
          linearGradient={true}
          textStyle={styles.buttonTextStyle}
          onPressCallback={() => handleSend()}
        />
      </View>
    </View>
  )
}
