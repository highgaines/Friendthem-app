import React from 'react';

// Libraries
import { CachedImage } from "react-native-img-cache";

// Images
import { Images } from '../../Themes';

export default ImageCircle = props => {
  const { size, extraStyles, source } = props

  return (
    <CachedImage
      style={[{
        height: size,
        width: size,
        borderRadius: size/2
      }, extraStyles]}
      mutable
      source={source ? {uri: source} : Images.noPicSVG}
    />
  )
}
