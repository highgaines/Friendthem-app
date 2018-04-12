import React, { Component } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import Image from 'react-native-remote-svg'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { updateSnapInfo, updatePassword } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/ChangePasswordModalStyles'
import { Images } from '../../Themes'

class FriendThemModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      snapHandle: '',
      oldPassword: '',
      isOldPasswordHidden: true,
      newPassword: '',
      isNewPasswordHidden: true,
      confirmPassword: '',
      isConfirmPasswordHidden: true
    }
  }

  submitSnapHandle = () => {
    const { submitText, toggleSnapchatModal, accessToken, updateSnapInfo } = this.props

    updateSnapInfo('snapchat', this.state.snapHandle, accessToken)
    toggleSnapchatModal()
  }

  onChangeOldPassword = (oldPassword) => {
    this.setState({ oldPassword })
  }

  onChangeNewPassword = (newPassword) => {
    this.setState({ newPassword })
  }

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState({ confirmPassword })
  }

  toggleOldPassword = () => {
    this.setState({
      isOldPasswordHidden: !this.state.isOldPasswordHidden
    })
  }

  toggleNewPassword = () => {
    this.setState({
      isNewPasswordHidden: !this.state.isNewPasswordHidden
    })
  }

  toggleConfirmPassword = () => {
    this.setState({
      isConfirmPasswordHidden: !this.state.isConfirmPasswordHidden
    })
  }

  handleSubmitPW = () => {
    const { accessToken, updatePassword, toggleChangePasswordModal, toggleConfirmPasswordModal } = this.props
    const { oldPassword, newPassword } = this.state

    updatePassword(accessToken, oldPassword, newPassword)
    toggleChangePasswordModal()
    setTimeout(() => toggleConfirmPasswordModal(), 1000)
  }

  comparePasswords = () => {
    const { newPassword, confirmPassword} = this.state
    return newPassword === confirmPassword
  }

  render() {
    const { modalVisible, toggleChangePasswordModal } = this.props
    const { snapHandle } = this.state

    return (
      <Modal
      animationIn='slideInUp'
      animationOut='slideOutDown'
      avoidKeyboard={true}
      onBackdropPress={toggleChangePasswordModal}
      isVisible={modalVisible}>
        <View style={styles.containerModal}>
          <LinearGradient
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 1.0}} end={{x: 0.8, y: 0.8}}
            locations={[0.5, 0.7, 0.8, 0.9, 1.0]}
            style={styles.headerGradient}>
            <Image
              source={Images.closedLock}
              style={{height: 57, width: 37, zIndex: 99}}
              />
            <Text style={styles.headerText}>
              Enter New Password
            </Text>
          </LinearGradient>
          <View style={styles.entryContainer}>
            <Text style={styles.sectionHead}>
              Current Password
            </Text>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              secureTextEntry={this.state.isOldPasswordHidden}
              style={styles.textInput}
              value={this.state.oldPassword}
              onChangeText={this.onChangeOldPassword}
              />
            <TouchableOpacity
              onPress={this.toggleOldPassword}
              style={styles.showEye}>
              <Image
                source={Images.showEye}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.entryContainer}>
            <Text style={styles.sectionHead}>
              New Password
            </Text>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              secureTextEntry={this.state.isNewPasswordHidden}
              style={styles.textInput}
              value={this.state.newPassword}
              onChangeText={this.onChangeNewPassword}
              />
            <TouchableOpacity
              onPress={this.toggleNewPassword}
              style={styles.showEye}>
              <Image
                source={Images.showEye}
                />
            </TouchableOpacity>
          </View>
            <View style={[styles.entryContainer, {borderBottomWidth: 1}]}>
              <Text style={styles.sectionHead}>
                Confirm Password
              </Text>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                secureTextEntry={this.state.isConfirmPasswordHidden}
                style={styles.textInput}
                value={this.state.confirmPassword}
                onChangeText={this.onChangeConfirmPassword}
              />
              <TouchableOpacity
                onPress={this.toggleConfirmPassword}
                style={styles.showEye}>
                <Image
                  source={Images.showEye}
                />
              </TouchableOpacity>
            </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={toggleChangePasswordModal}
              style={styles.optionButton}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={this.handleSubmitPW}
            >
              <Text style={styles.buttonText}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.userStore.userId,
  accessToken: state.authStore.accessToken,
  passwordUpdate: state.userStore.passwordUpdated
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      updateSnapInfo,
      updatePassword
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendThemModal)
