import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, Button } from 'react-native';

// Components
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ImageCircle from '../UtilityComponents/ImageCircle';

// Libraries
import * as Animatable from 'react-native-animatable';
import Communications from 'react-native-communications';

// Styles
import styles from '../Styles/InviteUserCardStyles';

// Images
import { Images } from '../../Themes';

export default UserCard = ({
  firstName,
  lastName,
  phoneNumbers,
  emailAddresses,
  userPlatforms,
  triggerModal,
  selectUser
}) => {


  const determineMobileNumber = () => {
    let mobile = phoneNumbers.filter( numberObj => numberObj.label === 'mobile')

    return mobile.number
  }

  const determineAnyEmail = () => {
    return emailAddresses[0] ? emailAddresses[0].email : null
  }

  const handleTextInvite = () => {
    let phoneNumber = determineMobileNumber()
    Communications.text(phoneNumber, 'Friend Them is Great! Download it here!')
  }

  const handleEmailInvite = () => {
    let emailAddress = determineAnyEmail()
    Communications.email(emailAddress, 'Friend Them is Great! Download it here!')
  }

  return (
    <Animatable.View style={styles.userCardContainer} animation="slideInLeft">

      <View style={styles.infoColumn}>
        <Text style={styles.userNameText}> {`${firstName} ${lastName}`} </Text>
      </View>

      <View style={styles.sendButtonColumn}>
        <TouchableOpacity
          style={styles.inviteRowContent}
          onPress={() => handleTextInvite()}>
          <Image
            source={Images.textMessageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inviteRowContent}
          onPress={() => handleEmailInvite()}>
          <Image
            style={{ width: 37, height: 37 }}
            source={Images.emailIcon}
          />
        </TouchableOpacity>
      </View>

    </Animatable.View>
  )
}
