import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, Button } from 'react-native';
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ImageCricle from '../UtilityComponents/ImageCircle';

// Styles
import styles from '../Styles/InviteUserCardStyles';

export default UserCard = props => {
  const { userImage, userName, userPlatforms } = props

  const handleSend = () => {
      console.log('sending')
  }

  const renderSocialIcons = () => {
    return userPlatforms.map( platform =>
      <SMPlatformCircle
        platform={platform}
      />
    )
  }

  return (
    <View style={styles.userCardContainer}>

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

    </View>
  )
}
