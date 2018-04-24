import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, Button } from 'react-native';

// Components
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ImageCircle from '../UtilityComponents/ImageCircle';

// Libraries
import * as Animatable from 'react-native-animatable';
import Communications from 'react-native-communications';
import SendSMS from 'react-native-sms'

// Styles
import styles from '../Styles/InviteUserCardStyles';

// Images
import { Images } from '../../Themes';

export default UserCard = ({
  firstName,
  lastName,
  accessToken,
  phoneNumbers,
  emailAddresses,
  userPlatforms,
  triggerModal,
  selectUser,
  inviteUser
}) => {


  const determineMobileNumber = () => {
    return phoneNumbers[0] ? phoneNumbers[0].number : null
  }

  const handleTextInvite = () => {
    let phoneNumber = determineMobileNumber()

    SendSMS.send({
      body: 'There’s got to be a better way.. check out this new awesome app! https://apple.co/2Dm46dF',
      recipients: [phoneNumber],
      successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
      if (completed) {
        structuredPhoneNum = `+${phoneNumber.split(/[-)(\s]/).join('')}`
        inviteUser(accessToken, structuredPhoneNum)
      }
    })
  }

  return (
    <View style={styles.userCardContainer}>

      <View style={styles.infoColumn}>
        <Text style={styles.userNameText}> {`${firstName ? firstName : ''} ${lastName ? lastName : ''}`} </Text>
      </View>

      <View style={styles.sendButtonColumn}>
        <TouchableOpacity
          style={styles.inviteRowContent}
          onPress={() => handleTextInvite()}>
          <Image
            source={Images.textMessageIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
