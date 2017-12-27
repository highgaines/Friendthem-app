import React, { Component } from 'react'
import { Text, TextInput, View, Switch } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from '../Styles/PersonalInfoTabStyles'

export default class InfoRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      flipSwitch: false
    }
  }

  render() {
    const { rowLabel, userInfo, showSwitch, isPrivate } = this.props
    const { isEditing, flipSwitch } = this.state
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowLabelText}>{`${rowLabel}: `}</Text>
        <Text style={styles.rowTextContent}>{userInfo}</Text>
        {
          showSwitch ?
          <Switch
            onTintColor='#f6385e'
            onValueChange={() => this.setState({flipSwitch: !flipSwitch})}
            value={flipSwitch}
            style={styles.switchStyle} />
            :
            null
        }
        <Icon
          name='pencil'
          type='simple-line-icon'
          size={15}
          color='#6f6f71'
          containerStyle={styles.iconContainer}/>
      </View>
    )
  }
}
