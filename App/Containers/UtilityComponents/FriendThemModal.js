import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'

//Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

//styles
import styles from '../Styles/FriendThemModalStyles'

class FriendThemModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      snapHandle: ''
    }
  }

  submitSnapHandle = () => {
    const { submitText, toggleSnapchatModal } = this.props

    submitText(this.state.snapHandle)
    toggleSnapchatModal()
  }

  render() {
    const { modalVisible, toggleSnapchatModal } = this.props
    const { snapHandle } = this.state
    console.log(snapHandle)
    return (
      <Modal
      animationIn='slideInUp'
      animationOut='slideOutDown'
      onBackdropPress={toggleSnapchatModal}
      isVisible={modalVisible}>
        <View style={styles.containerModal}>
          <LinearGradient
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 1.0}} end={{x: 0.8, y: 0.8}}
            locations={[0.5, 0.7, 0.8, 0.9, 1.0]}
            style={styles.headerGradient}>
            <Icon
              name={'snapchat-ghost'}
              type='font-awesome'
              color='#fff'
              size={50}/>
            <Text style={styles.headerText}>
              Snapchat
            </Text>
          </LinearGradient>
          <Text style={styles.modalBodyText}>
            Entering your Snapchat handle here will help us
            connect you with people more seamlessly.
          </Text>
          <TextInput
            style={styles.modalTextInput}
            value={snapHandle}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(value) => this.setState({snapHandle: value})}/>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => this.submitSnapHandle()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.userStore.userId
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     bindActionCreators({
//
//     }, dispatch)
//   }
// }

export default connect(mapStateToProps)(FriendThemModal)
