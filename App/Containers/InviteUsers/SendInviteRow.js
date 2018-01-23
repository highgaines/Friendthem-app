import React from 'react';
import { StyleSheet } from 'react-native'
import { View, TouchableOpacity, Text, Button } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/';

// Libraries
import SendSMS from 'react-native-sms';
import Image from 'react-native-remote-svg';
import Communications from 'react-native-communications';

// Images
import { Images } from '../../Themes';

export default SendInviteRow = props => {
  const { platform } = props

  const renderIcon = () => {
      switch(platform) {
        case 'Text Message':
          return Images.textMessageIcon
        case 'FB Messenger':
          return Images.messengerIcon
      }
  }

  // will have to tweak - currently not working
  const handleInvite = () => {
    Communications.text('3472917739', 'You have been invited to download FriendThem')
  }

  return(
      <TouchableOpacity style={styles.inviteRowContent}>
        <Image
          source={renderIcon()}
        />
        <Text style={styles.text}>
          Send request through {platform}
        </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  inviteRowContent: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 5
  }
})
