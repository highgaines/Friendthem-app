import React from 'react'
import { Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native'

// Libraries
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import { CachedImage } from "react-native-img-cache";

// Styles
import styles from '../Styles/PhotoModalStyles'
import { Images } from '../../Themes'

export default MyPicturesModal = ({ imageObj, toggle, visible}) => {

  return(
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={toggle}
      isVisible={visible}>
      <TouchableOpacity
        onPress={toggle}
        style={styles.fullScreen}
      >
        <CachedImage
          mutable
          source={{uri: imageObj.url}}
          style={styles.expandedImage}
        />
      </TouchableOpacity>
    </Modal>
  )
}
