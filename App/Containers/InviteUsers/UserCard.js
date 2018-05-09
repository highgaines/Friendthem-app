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
  inviteUser,
  userSocialProfiles
}) => {


  const determineMobileNumber = () => {
    return phoneNumbers[0] ? phoneNumbers[0].number : null
  }

  const constructSocialMediaLinkText = () => {
    return userSocialProfiles.reduce((finalText, socialProfile, idx, array) => {
      if (idx === 0) {
        return finalText += `Hey! Check out my social media profiles:\n ${idx + 1}.) ${socialProfile.provider} - there would ideally be a link here.\n`
      } else {
        return finalText += ` ${idx + 1}.) ${socialProfile.provider} - there would ideally be a link here.\n`
      }
    }, '')
  }

  const handleTextInvite = () => {
    let phoneNumber = determineMobileNumber()
    const socialMediaLinkText = constructSocialMediaLinkText()

    SendSMS.send({
      body: socialMediaLinkText,
      recipients: [phoneNumber],
      successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
      if (completed) {
        const structuredPhoneNum = `+${phoneNumber.split(/[-)(\s]/).join('')}`
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
