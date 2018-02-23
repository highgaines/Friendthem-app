import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'

import ConnectButton from './ConnectButton'

import styles from '../Styles/SuperConnectBarStyles'
import Analytics from 'analytics-react-native'

const analytics = new Analytics('4oWQ8t7HH7pjXWW49ZZnUiXKwS77I4Gh')

export default class SuperConnectBar extends Component {
  navigateToSuperConnect = () => {
    this.props.setSuperConnectPlatforms()
    this.props.superConnect()
    analytics.track({
      userId: this.props.userId,
      event: 'Super Connect Request',
      properties: {
        requester: this.props.userData
      }
    })
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <ConnectButton
          name='people'
          type='simple-line-icons'
          color='#ffffff'
          title='FRIENDTHEM'
          containerStyle={styles.friendThemButton}
          textStyle={styles.buttonTextStyle}/>

        <ConnectButton
          name='bolt'
          type='font-awesome'
          color='#ffffff'
          title='SUPER CONNECT'
          onPressCallback={this.navigateToSuperConnect}
          containerStyle={styles.superConnectButton}
          textStyle={styles.buttonTextStyle}/>
      </View>
    )
  }
}
