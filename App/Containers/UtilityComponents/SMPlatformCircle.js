import React from 'react';
import { View, Image } from 'react-native';
// import Image from 'react-native-remote-svg';
import { SocialIcon } from 'react-native-elements';
import { Images } from '../../Themes';

export default SMPlatformCircle = props => {
  // if you want button form, add button={true} prop
  const { size, extraStyles, platform, light, button } = props

  const renderIcon = arg => {
      switch(arg) {
        case 'twitter':
          return Images.twitterIcon
        case 'facebook':
          return Images.fbSketchPNG
        case 'snapchat':
          return Images.snapchatIcon
        case 'instagram':
          return Images.igSketchPNG
        case 'youtube':
          return Images.youtubeIcon
        default:
          return Images.friendster
      }
  }

  return (
    <View
      style={{
        backgroundColor: '#fff'
      }, extraStyles}>
      <Image
        style={{
          width: size,
          height: size
        }}
        source={renderIcon(platform)}
      />
    </View>
  )
}
