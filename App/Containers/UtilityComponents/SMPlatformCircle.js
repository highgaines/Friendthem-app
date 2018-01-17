import React from 'react';
import { View, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Images } from '../../Themes';

export default SMPlatformCircle = props => {
  // if you want button form, add button={true} prop
  const { iconSize, size, extraStyles, platform, raised, title, light, button } = props

  const renderIcon = arg => {
      switch(arg) {
        case 'twitter':
          return Images.twitterIcon
        case 'facebook':
          return Images.fbIcon
        case 'snapchat':
          return Images.snapchatIcon
        case 'instagram':
          return Images.igIcon
      }
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: size/2,
        width: 10,
        height: 10,
      }, extraStyles}>
      <Image
        source={renderIcon(platform)}
      />
    </View>
  )
}
