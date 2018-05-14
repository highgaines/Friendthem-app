import React from 'react';
import { View, Image } from 'react-native';

// Libraries
import { SocialIcon } from 'react-native-elements';

// Images
import { Images } from '../../Themes';

export default SMPlatformCircle = ({size, extraStyles, platform, light, button}) => {
  // if you want button form, add button={true} prop

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
        case 'camera':
          return Images.cameraIcon
        case 'youtube':
          return Images.youtubeIcon
        case 'linkedin':
          return Images.linkedInIcon
        default:
          return Images.socialWheelLogo
      }
  }

  customStyling = () => {
    if (platform === "camera") {
      return { borderWidth: 2, borderColor: 'white', borderRadius: size/2, marginVertical: 10 }
    } else if (platform === "profile") {
      return { marginVertical: 10 }
    } else if (platform === 'snapchat' || platform === 'youtube') {
      return { margin: 7.5 }
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#fff'
      }, extraStyles}>
      <Image
        style={[{
          width: size,
          height: size},
          customStyling()
        ]}
        source={renderIcon(platform)}
      />
    </View>
  )
}
