import React from 'react';
import { Image } from 'react-native';
import { Images } from '../../Themes';

export default ImageCircle = props => {
  const { size, extraStyles, source } = props

  return (
    <Image
      style={[{
        height: size,
        width: size,
        borderRadius: size/2
      }, extraStyles]}
      source={source ? {uri: source} : Images.noPicSVG}
    />
  )
}
