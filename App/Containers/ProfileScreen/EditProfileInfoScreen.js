import React, { Component } from 'react'
import { Text, Image, Switch, View, ScrollView, TouchableOpacity } from 'react-native'

// Libraries
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

// Components
import PersonalInfoTab from './PersonalInfoTab'
import SocialMediaInfoTab from './SocialMediaInfoTab'

// Redux
import { connect } from 'react-redux'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/EditProfileInfoStyles'


class EditProfileInfoScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      infoTabSelect: true
    }
  }

  returnToProfile = () => {
    this.props.navigation.navigate('UserProfileScreen')
  }

  render() {
    const { userInfo } = this.props
    const { infoTabSelect } = this.state
    return (
      <View>

      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userData,
  passwordUpdated: state.userStore.passwordUpdated
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileInfoScreen)
