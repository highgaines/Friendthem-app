import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'

import ConnectButton from './ConnectButton'

import styles from '../Styles/SuperConnectBarStyles'
import Analytics from 'analytics-react-native'
import envConfig from '../../../envConfig'
const analytics = new Analytics(envConfig.Development.SegmentAPIKey)

export default class SuperConnectBar extends Component {
  navigateToSuperConnect = (platforms, copy) => {

    this.props.setSuperConnectPlatforms()
    this.props.superConnect(platforms, copy)
    analytics.track({
      userId: this.props.userId,
      event: 'Super Connect Request',
      properties: {
        requester: this.props.userData
      }
    })
  }

  render() {
    const { iphoneXStyle, platforms } = this.props

    const superConnectCopy = 'Are you sure you would like to Super Connect on all platforms with'

    const friendThemCopy = 'Are you sure you would like to connect on the selected platforms with'

    return (
      <View style={[styles.buttonContainer, iphoneXStyle]}>
        <ConnectButton
          name='people'
          type='simple-line-icons'
          color='#ffffff'
          title='FRIENDTHEM'
          onPressCallback={() =>
            this.navigateToSuperConnect(this.props.selected, friendThemCopy)}
          containerStyle={styles.friendThemButton}
          textStyle={styles.buttonTextStyle}/>

        <ConnectButton
          name='bolt'
          type='font-awesome'
          color='#ffffff'
          title='SUPER CONNECT'
          onPressCallback={() => this.navigateToSuperConnect(platforms, superConnectCopy)}
          containerStyle={styles.superConnectButton}
          textStyle={styles.buttonTextStyle}/>
      </View>
    )
  }
}
