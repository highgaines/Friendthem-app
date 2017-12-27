import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from '../Styles/PersonalInfoTabStyles'

export default class InfoRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }

  render() {
    const rowLabel = 'User Name'
    const userInfo = {
      userName: 'Eoghan Leddy',
      userHobbies: ['Swimming', 'Biking', 'Coding'],
      userLocation: 'NYC',
      userAge: 26,
      userPrivate: {
        phone: '18008008000',
        email: 'eoghan@leddy.com'
      }
    }
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowLabelText}>{rowLabel}</Text>
        <Text>{userInfo.userName}</Text>
      </View>
    )
  }
}
