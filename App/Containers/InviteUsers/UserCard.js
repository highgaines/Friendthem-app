import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, Button } from 'react-native';
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ImageCircle from '../UtilityComponents/ImageCircle';

// Libraries
import * as Animatable from 'react-native-animatable';

// Styles
import styles from '../Styles/InviteUserCardStyles';

export default UserCard = props => {
  const { userImage, userName, userPlatforms, triggerModal, selectUser } = props

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

  return (
    <Animatable.View style={styles.userCardContainer} animation="slideInLeft">
      <View style={styles.imageColumn}>
        <ImageCircle
          size={70}
          source={userImage}
        />
      </View>

      <View style={styles.infoColumn}>
        <Text style={styles.userNameText}> {userName} </Text>
        <View style={styles.socialIcons}>
          {renderSocialIcons()}
        </View>
      </View>

      <View style={styles.sendButtonColumn}>
        <Button title="SEND" onPress={() => handleSend()}/>
      </View>
    </Animatable.View>
  )
}
