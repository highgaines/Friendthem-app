import React, { Component } from 'react'
import { Text, Image, View, ActionSheetIOS, TouchableOpacity, ActivityIndicator } from 'react-native'

// Libraries
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
      pic: '',
      dummyData: [
        {url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/24301357_10101682515692025_688989114175452534_n.jpg?oh=66b2cdce4d4d5d443c4156f6a4e81347&oe=5B07BC92'},
        {url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/23270226_10101658951684485_977597476345122145_o.jpg?oh=b36f1034d10153952b23ed2407492e96&oe=5B4C5745'},
        {url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/19420766_10101528166873295_5937630718577662222_n.jpg?oh=6fcfb6a95c56b3b4bdfb0a42b9d2000b&oe=5B02C766'},
        {url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/18055990_10101455154141395_1449195833100672529_o.jpg?oh=890ec6f2f150d59970b63dedffa23c77&oe=5B411BB6'},
        {url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/15621734_10101337453718985_366056588442519810_n.jpg?oh=2b7bfe8ef016feaf1cabc0fa7946c0f8&oe=5B4CD03D'},
        {url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/14556604_10101965462853963_3292444078014420283_o.jpg?oh=99d58a2115d6c2e9ccb18b45b3554d1b&oe=5B0E2854'}
      ]
    }
  }

  componentDidMount = () => {
    // call action to hit backend and fetch pictures here
    const { getMyPics, accessToken } = this.props
    getMyPics(accessToken)
  }

  handleImagePress = pictureId => {
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

    const options = {
      title: 'Profile Picture Options',
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
    const { myPictures } = this.props
    return myPictures.map( (imageObj, idx) => {
      return(
        <TouchableOpacity
          key={idx}
          onPress={() => this.handleImagePress(imageObj.id)}
          style={styles.myPicsCard}
        >
          <Image
            style={{ width: '100%', height: 120, borderRadius: 10}}
            source={{uri: imageObj.url}}
          />
        </TouchableOpacity>
      )
    })
  }

  render() {
    return(
      <View style={styles.socialAccountContainer}>
        {this.renderImages()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    myPictures: state.userStore.myPictures,
    userPhotos: state.userStore.userPhotos,
    fetching: state.userStore.fetching,
    editableData: state.userStore.editableData,
    accessToken: state.authStore.accessToken
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
