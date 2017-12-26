import React, { Component } from 'react';
import { View, Modal, Text, Button } from 'react-native'


export default class LogoutModal extends Component {
  render() {
    const { showModal, logOut, toggleModal, modalStyle } = this.props
    return (
      <View>
        <Modal
          transparent={true}
          visible={showModal}
          animationType='slide'
          >
            <View style={modalStyle}>
              <Text style={{ fontSize: 15, color: 'black' }}> Are you sure you want to logout? </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                <Button onPress={logOut} title='Logout'/>
                <Button onPress={toggleModal} title='Cancel'/>
              </View>
            </View>
          </Modal>
      </View>
    )
  }
}