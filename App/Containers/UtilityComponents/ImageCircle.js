import React from 'react';
import { Image } from 'react-native';

export default ImageCircle = props => {
  const { size, extraStyles, source } = props

  return (
    <Image
      style={[{
        height: size,
        width: size,
        borderRadius: size/2
      }, extraStyles]}
      source={{uri: source}}
    />
  )
}
