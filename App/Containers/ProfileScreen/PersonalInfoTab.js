import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'

import InfoRow from './InfoRow'

import styles from '../Styles/PersonalInfoTabStyles'

export default class PersonalInfoTab extends Component {
  render() {
    return (
      <View style={styles.personalInfoContainer}>
        <InfoRow
          rowLabel='USER NAME'
          userInfo='Eoghan Leddy'/>
        <InfoRow
          rowLabel='OCCUPATION'
          userInfo={['Coder', 'Biker', 'Swimmer'].join(', ')}/>
        <InfoRow
          rowLabel='LOCATION'
          userInfo='New York City'/>
        <InfoRow
          rowLabel='AGE'
          userInfo={26}/>
        <View style={styles.privateRowDivider}>
          <Text
            style={styles.mainPrivateText}>
            PRIVATE INFORMATION
          </Text>
          <Text
            style={styles.subPrivateText}>
            Private
          </Text>
          <Icon
            name='question'
            type='evilicon'
            containerStyle={styles.privateIcon} />
        </View>
        <InfoRow
          rowLabel='PHONE'
          userInfo='(800)800-8000'
          showSwitch={true}/>
        <InfoRow
          rowLabel='EMAIL'
          userInfo='eoghan@me.com'
          showSwitch={true}/>
        <InfoRow
          rowLabel='PASSWORD'
          userInfo='********'/>
      </View>
    )
  }
}
