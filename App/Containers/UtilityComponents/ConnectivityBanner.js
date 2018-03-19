import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from '../Styles/ConnectivityBannerStyles'
import { Images } from '../../Themes'

export default ConnectivityBanner = props => {

  return (
    <View style={styles.bannerView}>
      <Image source={Images.friendThemLogoNoText} style={styles.bannerLogo}/>
      <Text
        style={styles.bannerText}>You are already connected with
          <Text style={styles.bannerStrongText}>{` ${props.name}`}</Text> {props.platform}
      </Text>
    </View>
  )
}
