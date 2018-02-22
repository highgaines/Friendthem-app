import React, { Component } from 'react'
import { Text, Button, TextInput, View, Switch, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from '../Styles/PersonalInfoTabStyles'

export default class InfoRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      flipSwitch: props.switchToggled && props.userInfo,
      input: props.userInfo
    }
  }

  toggleEditMode = () => {
    const { isEditing } = this.state
    this.setState({ isEditing: !isEditing })
  }

  handleChange = input => {
    this.setState({ input: input })
  }

  handleSubmit = () => {
    const { updateInfo, field } = this.props
    const { input } = this.state
    this.setState({ isEditing: false}, () => updateInfo(field, input) )
  }

  render() {
    const { rowLabel, userInfo, showSwitch, isPrivate, updateInfo, secureText, toggleChangePasswordModal, field } = this.props
    const { isEditing, flipSwitch } = this.state

    let editPressCallback = toggleChangePasswordModal
      ? toggleChangePasswordModal
      : this.toggleEditMode

    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowLabelText}>{`${rowLabel}: `}</Text>
        {isEditing ?
          <TextInput
            testID={`input-${field}`}
            value={this.state.input}
            style={styles.form}
            secureTextEntry={secureText}
            onChangeText={input => this.handleChange(input)}
          /> :
          <Text
            testID={`input-display-${field}`}
            style={styles.rowTextContent}>
            {secureText || flipSwitch ? '********' : userInfo}
          </Text>}
        {
          showSwitch ?
          <Switch
            onTintColor='#f6385e'
            onValueChange={() => this.setState({flipSwitch: !flipSwitch})}
            value={flipSwitch}
            style={styles.switchStyle} />
            : null
        }
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={editPressCallback}
          >
          { isEditing ?
            <View style={{ position: 'absolute', right: -10, top: -10}}>
              <Button
                testID='save-button'
                title="SAVE" onPress={this.handleSubmit}/>
            </View> :
            <Icon
              testID={`edit-pencil-${field}`}
              name='pencil'
              type='simple-line-icon'
              size={15}
              color='#6f6f71'
            /> }
          </TouchableOpacity>
      </View>
    )
  }
}
