import React from 'react';
import { View, Image as NativeImage } from 'react-native'

// Libraries
import Image from 'react-native-image-progress'
import { CustomCachedImage } from "react-native-img-cache";
import * as Progress from 'react-native-progress';

// Images
import { Images } from '../../Themes';

export default ImageCircle = props => {
  const { size, extraStyles, source } = props

  if (source) {
    return (
      <Image
        indicator={Progress.Pie}
        indicatorProps={{
          size: 30,
          borderWidth: 1,
          color: 'rgba(255, 0, 150, 1)',
          unfilledColor: 'rgba(255, 255, 255, 0.9)'
        }}
        style={[{
          width: size,
          height: size
        }, extraStyles]}
        imageStyle={{borderRadius: size/2}}
        source={{cache: 'force-cache', uri: source  }}
      />
    )
  } else {
    return (
      <NativeImage
        style={{ width: size, height: size}}
        source={Images.noPicSVG}
      />
    )
  }
}
