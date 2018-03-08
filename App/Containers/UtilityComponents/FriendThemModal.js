import React, { Component } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { updateSnapInfo } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/FriendThemModalStyles'

class FriendThemModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }
  }

  submitSnapHandle = () => {
    const { submitText, toggleModal, accessToken, updateSnapInfo } = this.props

    updateSnapInfo('snapchat', this.state.input, accessToken)
    toggleModal()
  }

  okAction = () => {
    const { okActionCallback } = this.props

    okActionCallback()
    toggleModal()
  }

  render() {
    const { modalVisible, toggleModal, snapchat, headerText, text, form } = this.props
    const { input } = this.state

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
            { snapchat
              ? <Icon
                  name={'snapchat-ghost'}
                  type='font-awesome'
                  color='#fff'
                  size={50}
                />
              : null
            }
            <Text style={styles.headerText}>
              {headerText}
            </Text>
          </LinearGradient>
          <Text style={styles.modalBodyText}>
            {text}
          </Text>
          {form
            ? <View style={{ alignItems: 'center' }}>
                <TextInput
                  style={styles.modalTextInput}
                  value={input}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onChangeText={(value) => this.setState({input: value})}/>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => this.submitSnapHandle()}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            : <TouchableOpacity
                style={styles.modalButton}
                onPress={() => this.okAction()}
              >
                <Text style={styles.buttonText}> Okay </Text>
              </TouchableOpacity>
            }
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.userStore.userId,
  accessToken: state.authStore.accessToken
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      updateSnapInfo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendThemModal)
