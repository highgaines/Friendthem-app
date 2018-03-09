import React, { Component } from 'react'
import { Text, Image, View, ActionSheetIOS, TouchableOpacity, ActivityIndicator } from 'react-native'

// Libraries
import { CachedImage } from "react-native-img-cache";
import { Icon } from 'react-native-elements'
import { uploadToAWS, uploadToAWS2 } from '../../Utils/functions'
import ImagePicker from 'react-native-image-picker'
import FbPhotoModal from './FbPhotoModal'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, {
  getMyPics,
  getFBPhotos,
  updateInfoRequest,
  addPic,
  deletePic
} from '../../Redux/UserStore'

// Styles
import styles from '../Styles/UserProfileStyles'
import { ifIphoneX } from '../../Themes/Helpers'

class MyPicturesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pic: ''
    }
  }

  componentDidMount = () => {
    // call action to hit backend and fetch pictures here
    const { getMyPics, accessToken } = this.props
    getMyPics(accessToken)
  }

  handleImagePress = (pictureId=null, primary) => {
    const { id } = this.props.userInfo
    const {
      editableData,
      accessToken,
      getFBPhotos,
      updateInfoRequest,
      userPhotos,
      addPic,
      deletePic,
      myPictures,
      togglePhotoModal
    } = this.props

    const primaryOptions = {
      title: 'My Pictures Options',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
        {name: 'delete', title: 'Delete current photo'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 1
      }
    }

    const secondaryOptions = {
      title: 'What would you like to do?',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'}
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 1
      }
    }

    const options = primary ? primaryOptions : secondaryOptions

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton === 'fb') {
        // fetch fb pics and change social media cards into pic cards
        console.log('User tapped import from facebook')
        getFBPhotos(accessToken)
        togglePhotoModal()

      }
      else if (response.customButton === 'delete') {
        // remove picture from backend and replace with noPicSVG
        console.log('User tapped delete current photo')
        deletePic(accessToken, pictureId)
      }
      else {
        // use AWS upload function here to send uri
        let source = response.uri
        this.setState({ pic: source }, () => uploadToAWS2(source, id, addPic, pictureId, accessToken))
      }
    })
  }

  renderImages = () => {
    const { myPictures, fetchingMyPics } = this.props
    return myPictures.map( (imageObj, idx) => {
      return(
        <TouchableOpacity
          key={idx}
          onPress={() => this.handleImagePress(imageObj.id, true)}
          style={styles.myPicsCard}
        >
          <CachedImage
            style={{ width: '100%', height: 120, borderRadius: 10}}
            source={{uri: imageObj.url}}
          />
        </TouchableOpacity>
      )
    })
  }



  renderAddImageCard = () => {
    const { myPictures } = this.props
    const calculatedPictureId = myPictures.length

    return(
      <TouchableOpacity
        onPress={() => this.handleImagePress(calculatedPictureId)}
        style={[styles.myPicsCard, { justifyContent: 'center', alignItems: 'center'}]}
      >
        <Text style={{ fontSize: 20, fontWeight: '600'}}> Add Image </Text>
        <Icon
            name='circle-with-plus'
            type='entypo'
            size={50}
            color='#fff'
          />
      </TouchableOpacity>
    )
  }

  render() {
    const { myPictures, fetchingMyPics} = this.props

    return fetchingMyPics
    ? <ActivityIndicator size="large" color="#0000ff" />
    : <View style={styles.socialAccountContainer}>
        {this.renderImages()}
        { myPictures.length < 6 ? this.renderAddImageCard() : null}
      </View>
  }
}

const mapStateToProps = state => {
  return {
    myPictures: state.userStore.myPictures,
    userPhotos: state.userStore.userPhotos,
    fetching: state.userStore.fetching,
    editableData: state.userStore.editableData,
    accessToken: state.authStore.accessToken,
    fetchingMyPics: state.userStore.fetchingMyPics
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      updateInfoRequest,
      getFBPhotos,
      getMyPics,
      addPic,
      deletePic
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPicturesContainer)
