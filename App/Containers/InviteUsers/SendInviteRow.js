import React from 'react';
import { StyleSheet } from 'react-native'
import { View, TouchableOpacity, Text, Button } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/';

// Libraries
import SendSMS from 'react-native-sms';
import Image from 'react-native-remote-svg';

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
    SendSMS.send({
      body: 'You have been invited to use FriendThem!',
      recipients: ['3472917739'],
      successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
      console.log('completed:', completed, 'cancelled:', cancelled, 'error:', error)
    })
  }

  return(
    <View style={styles.inviteRowContent}>
        <Image
          source={renderIcon()}
        />
        <Text style={styles.text}>
          Send request through {platform}
        </Text>
    </View>
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
