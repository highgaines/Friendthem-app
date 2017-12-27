import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'

import SocialMediaRow from './SocialMediaRow'

import styles from '../Styles/SocialInfoTabStyles'

export default class PersonalInfoTab extends Component {
  render() {
    return (
      <View style={styles.personalInfoContainer}>
        <SocialMediaRow
          isFirstRow={true}
          socialPlatform='facebook'
          userPlatformName='EoghanL' />
        <SocialMediaRow
          isFirstRow={false}
          socialPlatform='instagram'
          userPlatformName='eleddy' />
        <SocialMediaRow
          isFirstRow={false}
          socialPlatform='Twitter'
          userPlatformName='@eogh' />
        <SocialMediaRow
          isFirstRow={false}
          socialPlatform='snapchat'
          userPlatformName='eoghanL'
          locked={true} />
        <SocialMediaRow
          isFirstRow={false}
          socialPlatform='linkedin'
          userPlatformName='Eoghan Leddy'
          locked={true} />
        <SocialMediaRow
          isFirstRow={false}
          socialPlatform='youtube' />
        <SocialMediaRow
          isFirstRow={false}
          socialPlatform='facebook pages'
          userPlatformName='Eoghan Leddy'
          locked={true} />


      </View>
    )
  }
}
