import React, { Component } from 'react'
import { Dimensions, InteractionManager, Text, TextInput, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native'

// Libraries
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import { CachedImage } from "react-native-img-cache";

// Styles
import styles from '../Styles/PhotoModalStyles'
import { Images } from '../../Themes'

export default class MyPicturesModal extends Component {

renderImages = () => {
  const { imageObjects, toggle, visible} = this.props

  if(imageObjects && imageObjects.length) {
    return imageObjects.map( (obj, idx) => {
      return(
        <TouchableOpacity
          key={idx}
          onPress={toggle}
          style={[styles.fullScreen, { marginRight: 20 }]}
          >
            <CachedImage
              mutable
              source={{uri: obj.url}}
              style={styles.expandedImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      })
    }
  }


  render = () => {
    const { imageObjects, toggle, visible, xOffset} = this.props

    return(
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggle}
        isVisible={visible}>
        <ScrollView
          contentOffset={{ x: xOffset, y: 0}}
          horizontal={true}>
          {this.renderImages()}
        </ScrollView>
      </Modal>
    )
  }
}
