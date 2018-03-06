import React, { Component } from 'react'
import { Text, Button, TextInput, View, Switch, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import ModalSelector from 'react-native-modal-selector'
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

  renderAgeModal = () => {
    const { updateInfo, field, userInfo } = this.props
    let ageArray = []
    for (let i = 18; i < 80; i++) {
      ageArray.push({ key: i, label: i })
    }
    return (
      <ModalSelector
         data={ageArray}
         initValue={userInfo}
         onChange={option => { updateInfo(field, option.label) }} />
    )
  }

  render() {
    const { rowLabel, userInfo, showSwitch, isPrivate, updateInfo, secureText, toggleChangePasswordModal, field } = this.props
    const { isEditing, flipSwitch } = this.state

    let editPressCallback = toggleChangePasswordModal
      ? toggleChangePasswordModal
      : this.toggleEditMode

    return (
      <TouchableOpacity
        onPress={editPressCallback}
        activeOpacity={1}
        style={styles.rowContainer}>
        <Text style={styles.rowLabelText}>{`${rowLabel}: `}</Text>
        {
          field === 'age'
          ? null
          : isEditing ?
            <TextInput
              keyboardType={field === 'age' ? 'numeric' : undefined}
              testID={`input-${field}`}
              value={this.state.input}
              style={styles.form}
              secureTextEntry={secureText}
              onBlur={this.handleSubmit}
              autoFocus
              onChangeText={input => this.handleChange(input)}
            /> :
            <TouchableOpacity
              onPress={editPressCallback}
              >
              <Text
                testID={`input-display-${field}`}
                style={styles.rowTextContent}>
                {secureText || flipSwitch ? '********' : userInfo}
              </Text>
            </TouchableOpacity> }
        {
          showSwitch ?
          <Switch
            onTintColor='#f6385e'
            onValueChange={() => this.setState({flipSwitch: !flipSwitch})}
            value={flipSwitch}
            style={styles.switchStyle} />
            : null
        }
        { field === 'age' ?
          this.renderAgeModal()
          : null }
      </TouchableOpacity>
    )
  }
}
