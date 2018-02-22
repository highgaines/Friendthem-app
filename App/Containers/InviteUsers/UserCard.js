import React from 'react';
import { View, TouchableOpacity, ScrollView, Text, Button } from 'react-native';

// Components
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ImageCircle from '../UtilityComponents/ImageCircle';

// Libraries
import Image from 'react-native-remote-svg';
import * as Animatable from 'react-native-animatable';
import Communications from 'react-native-communications';

// Styles
import styles from '../Styles/InviteUserCardStyles';

// Images
import { Images } from '../../Themes';

export default UserCard = ({ userImage, userName, userPlatforms, triggerModal, selectUser }) => {

  const handleSend = () => {
    const userData = {
      userName: userName,
      userImage: userImage
    }
      selectUser(userData)
      triggerModal()
  }

  const renderSocialIcons = () => {
    return userPlatforms.map( (platform, idx) =>
      <SMPlatformCircle
        key={idx}
        platform={platform}
        size={30}
      />
    )
  }

  const handleInvite = () => {
    Communications.text('3472917739', 'Friendthem is Great! Download it here!')
  }

  return (
    <Animatable.View style={styles.userCardContainer} animation="slideInLeft">
      <View style={styles.imageColumn}>
        <ImageCircle
          size={70}
          source={`${userImage}`}
        />
      </View>

      <View style={styles.infoColumn}>
        <Text style={styles.userNameText}> {userName} </Text>
        <View style={styles.socialIcons}>
          {renderSocialIcons()}
        </View>
      </View>

      <View style={styles.sendButtonColumn}>
        <TouchableOpacity style={styles.inviteRowContent} onPress={() => handleInvite()}>
          <Image
            source={Images.textMessageIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inviteRowContent} onPress={() => handleInvite()}>
          <Image
            source={Images.messengerIcon}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}
