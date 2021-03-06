import React, { Component } from 'react'
import { Text, Image, View, ActionSheetIOS, TouchableOpacity, ActivityIndicator } from 'react-native'

// Libraries
import { CachedImage } from "react-native-img-cache";
import { Icon } from 'react-native-elements'
import { uploadToAWS, uploadToAWS2 } from '../../Utils/functions'
import ImagePicker from 'react-native-image-picker'
import FbPhotoModal from './FbPhotoModal'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, {
  getMyPics,
  getFBPhotos,
  uploadProgress,
  updateInfoRequest,
  addPic,
  editPic,
  deletePic
} from '../../Redux/UserStore'

// Styles
import styles from '../Styles/UserProfileStyles'
import { ifIphoneX } from '../../Themes/Helpers'
import { Metrics } from '../../Themes/'

class MyPicturesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pic: '',

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
      editPic,
      uploadProgress,
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

        togglePhotoModal(false, primary ? pictureId : null)

      }
      else if (response.customButton === 'delete') {
        // remove picture from backend and replace with noPicSVG
        console.log('User tapped delete current photo')
        deletePic(accessToken, pictureId)
      }
      else {
        // use AWS upload function here to send uri
        let source = response.uri
        let callback = primary ? editPic : addPic
        let newUrlId = primary ? Date.now() : null
        uploadToAWS2(source, id, callback, pictureId, uploadProgress, accessToken, newUrlId)
      }
    })
  }

  renderImages = () => {
    const { myPictures } = this.props
    if (myPictures && myPictures.length) {

      return myPictures.map( (imageObj, idx) => {

        return(
            <TouchableOpacity
              key={imageObj.url}
              onPress={() => this.handleImagePress(imageObj.id, true)}
              style={styles.myPicsCard}
              >
                <Image
                  style={{ width: '100%', height: 120, borderRadius: 10}}
                  source={{uri: imageObj.url}}
                />
                <View style={{ backgroundColor: 'blue', borderRadius: 50, borderColor: 'white', borderWidth: 2, padding: 3, position: 'absolute', top: '78%', right: 5}}>
                  <Icon
                    name="edit"
                    type="entypo"
                    size={12}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
          )
        })
      }
  }


  renderAddImageCard = () => {
    const { myPictures } = this.props

    if (myPictures) {
      const calculatedPictureId = Date.now()
      return(
        <TouchableOpacity
          onPress={() => this.handleImagePress(calculatedPictureId)}
          style={[styles.myPicsCard, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}]}
          >
            <Text style={{ color: '#d3d3d3', marginBottom: 10, fontSize: 18, fontWeight: '600'}}> Add Image </Text>
            <Icon
              name='circle-with-plus'
              type='entypo'
              size={50}
              color='#d3d3d3'
            />
          </TouchableOpacity>
        )
    }
  }

  render() {
    const { myPictures, fetchingMyPics, uploadProgressNumber} = this.props

    return fetchingMyPics
    ? <View style={{ marginTop: 20 }}> <ActivityIndicator size="large" color="#0000ff" /> </View>
    : <View style={styles.socialAccountContainer}>
        {this.renderImages()}
        { myPictures && myPictures.length < 6 ? this.renderAddImageCard() : null}
        { uploadProgressNumber > 0 && uploadProgressNumber < 1
          ? <View style={[styles.progressBarContainer]}>
              <Text style={{ fontSize: 13, backgroundColor: 'transparent', textAlign: 'center', fontWeight: '500'}}> Uploading Image... </Text>
              <Progress.Bar progress={uploadProgressNumber} width={Metrics.screenWidth * .8} />
            </View>
          : null
        }
      </View>
  }
}

const mapStateToProps = state => {
  return {
    myPictures: state.userStore.myPictures,
    userPhotos: state.userStore.userPhotos,
    uploadProgressNumber: state.userStore.updateProgress,
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
      uploadProgress,
      getMyPics,
      addPic,
      editPic,
      deletePic
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPicturesContainer)
