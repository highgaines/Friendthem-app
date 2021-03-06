import React, { Component } from 'react'
import { Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native'

// Libraries
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { updateInfoRequest, addPic, editPic } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/PhotoModalStyles'
import { Images } from '../../Themes'

class PhotoModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startingIndex: 0,
      selectedImageObject: {}
    }
  }

  shiftStartingIndex = (direction) => {
    if (direction === 'forward') {
      this.setState({ startingIndex: this.state.startingIndex + 10 })
    } else {
      this.setState({ startingIndex: this.state.startingIndex - 10 })
    }
  }

  onImageSelect = (imageObject) => {
    this.setState({ selectedImageObject: imageObject })
  }

  onChangeImage = () => {
    const { updateInfoRequest, editableData, accessToken, editingPictureId, togglePhotoModal, updateProfilePictureState, isProfile } = this.props

    if (isProfile){
      updateInfoRequest(editableData, 'picture', this.state.selectedImageObject.picture, accessToken)
      updateProfilePictureState(this.state.selectedImageObject.picture)
      togglePhotoModal()
    } else {
      this.onChangeMyPictures(editingPictureId)
      togglePhotoModal()
    }
  }

  onChangeMyPictures = (pictureId) => {
    const { accessToken, addPic, editPic } = this.props

    const { picture } = this.state.selectedImageObject

    if (pictureId) {
      editPic(accessToken, picture, pictureId)
    } else {
      addPic(accessToken, picture)
    }
  }


  renderImages = () => {
    const { userPhotos, myPicturesBool } = this.props
    const imagesToDisplay = userPhotos && userPhotos.data && userPhotos.data.data && userPhotos.data.data.slice(this.state.startingIndex, this.state.startingIndex + 4)
    return (
      <View style={styles.imageContainer}>
        {
          imagesToDisplay && imagesToDisplay.map((imageObj, i) =>
            {
              let imageSelected = this.state.selectedImageObject.id === imageObj.id
              const imageStyle = imageSelected ? [styles.image, { borderWidth: 5, borderColor: '#8cff1a' }] : styles.image
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.onImageSelect(imageObj)}
                  >
                  <Image
                    source={{uri: imageObj.picture}}
                    style={imageStyle}
                    />
                </TouchableOpacity> )
              }
            )
        }
      </View>
    )

  }


  render() {
    const { userPhotos, togglePhotoModal, modalVisible } = this.props
    const { snapHandle } = this.state
    const photoLength = userPhotos && userPhotos.data && userPhotos.data.data && userPhotos.data.data.length

    return (
      <Modal
        animationIn='slideInUp'
        animationOut='slideOutDown'
        onBackdropPress={togglePhotoModal}
        isVisible={modalVisible} >
        { photoLength ?
          <View style={styles.container}>
        { this.renderImages() }
          <View style={styles.buttonContainer}>
          { this.state.startingIndex !== 0
            ? <TouchableOpacity
              onPress={() => this.shiftStartingIndex('backward')}
              style={styles.button}>
              <Icon
                name="arrow-left"
                type="entypo"
                size={50}
                color="blue"
              />
            </TouchableOpacity>
            : <View />
          }
          { this.state.startingIndex < photoLength - 10
            ? <TouchableOpacity
              onPress={() => this.shiftStartingIndex('forward')}
              style={styles.button}>
              <Icon
                name="arrow-right"
                type="entypo"
                size={50}
                color="blue"
              />
            </TouchableOpacity>
            : <View />
          }
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={togglePhotoModal}
              style={styles.optionButton}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onChangeImage}
              style={styles.optionButton}>
              <Text style={styles.buttonText}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        : <View style={styles.container}>
          <Text style={styles.noPhotosText}>
            Sorry, no photos were found.
          </Text>
        </View>
      }
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.userStore.userId,
  editableData: state.userStore.editableData,
  accessToken: state.authStore.accessToken
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      updateInfoRequest,
      addPic,
      editPic
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal)
