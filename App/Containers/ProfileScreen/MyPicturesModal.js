import React from 'react'
import { Text, TextInput, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native'

// Libraries
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import { CachedImage } from "react-native-img-cache";

// Styles
import styles from '../Styles/PhotoModalStyles'
import { Images } from '../../Themes'

export default MyPicturesModal = ({ imageObjects, toggle, visible}) => {

  renderImages = () => {
    if(imageObjects && imageObjects.length) {
      return imageObjects.map( obj => {
        return(
          <TouchableOpacity
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

  return(
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={toggle}
      isVisible={visible}>
      <ScrollView
        horizontal={true}>
        {renderImages()}
      </ScrollView>
    </Modal>
  )
}
