import React, { Component } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'
// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { updateSnapInfo, updatePassword } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/ChangePasswordModalStyles'
import { Images } from '../../Themes'

class ConfirmPasswordChangeModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { modalVisible, toggleModal, passwordUpdate } = this.props
    const { snapHandle } = this.state

    return (
      <Modal
      animationIn='slideInUp'
      animationOut='slideOutDown'
      onBackdropPress={toggleModal}
      isVisible={modalVisible}>
        <View style={styles.containerModal}>
          <LinearGradient
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 1.0}} end={{x: 0.8, y: 0.8}}
            locations={[0.5, 0.7, 0.8, 0.9, 1.0]}
            style={styles.headerGradient}>
            <Text style={{top: 140, width: 280, alignSelf: 'center', fontSize: 18}}>
              { passwordUpdate
                ? 'Your password was changed successfully!'
                : 'Your password was not updated. Please make sure that you entered your old password correctly and that the new passwords match. '}
            </Text>
          </LinearGradient>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.optionButton, {top: 200, left: 65}]}>
              <Text style={styles.buttonText}>
                Okay
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordChangeModal)
