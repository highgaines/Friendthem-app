import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'

import ConnectButton from './ConnectButton'

import styles from '../Styles/SuperConnectBarStyles'

export default class SuperConnectBar extends Component {
  render() {
    console.log(this.props.superConnect)
    return (
      <View style={styles.buttonContainer}>
        <ConnectButton
          name='people'
          type='simple-line-icons'
          color='#ffffff'
          title='FRIENDTHEM'
          containerStyle={styles.friendThemButton}/>

        <ConnectButton
          name='bolt'
          type='font-awesome'
          color='#ffffff'
          title='SUPER CONNECT'
          onPressCallback={this.props.superConnect}
          containerStyle={styles.superConnectButton} />
      </View>
    )
  }
}
