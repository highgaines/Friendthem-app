import React, { Component } from 'react';
import { View, Modal, Text, Button, TouchableOpacity, Image } from 'react-native';

// Libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import ImageCircle from '../UtilityComponents/ImageCircle';
import ConnectButton from '../SuperConnectScreen/ConnectButton';
import SendInviteRow from './SendInviteRow';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/InviteUsersModalStyles';

export default class InviteUsersModal extends Component {
  render() {
    const { userData, showModal, modalStyle, triggerModal } = this.props

    return(
      <View>
        <Modal
          transparent={true}
          visible={showModal}
          animationType='slide'
        >
          <View style={modalStyle}>
            <View style={styles.blueRadial}>
              <Image
                source={Images.smallLogoSVG}
              />
            </View>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 1.0}} end={{x: 0.8, y: 0.8}}
              locations={[0.5, 0.7, 0.8, 0.9, 1.0]}
              style={styles.headerGradient}>
              <ImageCircle
                size={90}
                extraStyles={ { borderWidth: 3, borderColor: 'white', marginTop: 5, marginBottom: 5 }}
                source={'https://www.girlfriend.com.au/media/3722/1000-voldemort.jpg'}
              />
              <View style={styles.imageTextContainer}>
                <Text style={styles.imageText}>
                  Invite Voldemort to use Friendthem
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Download Friendthem to fill out your super profile and connect with all of your friends!
              </Text>
            </View>
            <View style={styles.requestsContainer}>
              <View style={styles.requestRow}>

              </View>
              <View style={styles.requestRow}>
                <SendInviteRow
                  platform={'FB Messenger'}
                />
                <SendInviteRow
                  platform={'Text Message'}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <ConnectButton
                title="CANCEL"
                containerStyle={styles.button}
                textStyle={styles.buttonTextStyle}
                onPressCallback={() => triggerModal()}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
