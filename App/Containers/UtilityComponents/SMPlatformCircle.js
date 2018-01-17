import React from 'react';
import { View } from 'react-native';
import { SocialIcon } from 'react-native-elements';

export default SMPlatformCircle = props => {
  // if you want button form, add button={true} prop
  const { iconSize, size, extraStyles, platform, raised, title, light, button } = props

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: size/2,
        width: 10,
        height: 10,
        transform: [ { scale: 0.1 }]
      }, extraStyles}>
      <SocialIcon
        iconSize={iconSize}
        type={platform}
        raised={raised}
        light={light}
      />
    </View>
  )
}
