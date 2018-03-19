import React, { Component } from 'react'
import { Dimensions, InteractionManager, Text, TextInput, View, Button, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'

// Libraries
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import { CachedImage } from "react-native-img-cache";

// Styles
import styles from '../Styles/PhotoModalStyles'
import { Images } from '../../Themes'

export default class MyPicturesModal extends Component {
  constructor(props) {
    super(props)
    this.scrollView = null
  }
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
    let newXOffset = Platform.OS === 'ios' ? xOffset : xOffset + 50
    return(
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggle}
        isVisible={visible}>
        <ScrollView
          horizontal
          ref={scrollView => {
            console.log(scrollView)
            if (scrollView !== null && this.scrollView !== scrollView){
              this.scrollView = scrollView
              setTimeout(() => scrollView.scrollTo({x: newXOffset, y: 0, animated: false}), 200)
            }
          }}
          >
          {this.renderImages()}
        </ScrollView>
      </Modal>
    )
  }
}
