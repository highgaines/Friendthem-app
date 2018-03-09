import React, { Component } from 'react'
import { Text, TextInput, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from '../Styles/SocialInfoTabStyles'

export default class InfoRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { isFirstRow, socialPlatform, userPlatformName, locked } = this.props
    const { } = this.state
    return (
      <View style={styles.socialMediaRowContainer}>
        <View style={styles.inputHeader}>
          <Text style={styles.platformText}>
            {socialPlatform.toUpperCase()}
          </Text>
          {
            isFirstRow ?
              <Text style={styles.syncText}>
                Sync
              </Text>
              :
              null
          }
        </View>
        <View style={styles.inputRow}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={userPlatformName && !locked ? styles.textInputSync : styles.textInputNonSync}
            placeholder="Add Username"
            value={userPlatformName} />
          {
            userPlatformName ?
            <Icon
              name='check'
              type='font-awesome'
              size={18}
              color={ locked ? '#ff1b71' : '#7fd324'}
              containerStyle={styles.syncCheckmark}/>
            :
            null
          }
          {
            userPlatformName ?
              locked ?
              <Image
                style={styles.syncImage}
                source={require('../../Images/sync_gradient.png')} />
              :
              <Image
                style={styles.syncImage}
                source={require('../../Images/sync_green.png')} />
            :
            <Image
              style={styles.syncImage}
              source={require('../../Images/sync_gray.png')} />
          }

        </View>
      </View>
    )
  }
}
