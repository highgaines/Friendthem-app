import React, { Component } from 'react'

// Components
import { View, TouchableOpacity, Text, Button, TextInput, ScrollView } from 'react-native'
import InfoRow from './InfoRow'

// Libraries
import { Icon } from 'react-native-elements'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { updateInfoRequest } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/PersonalInfoTabStyles'

class PersonalInfoTab extends Component {
  constructor(props) {
    super(props)
  }

  packageEditProfile = (field, content) => {
    const { updateInfoRequest, editableData, accessToken } = this.props

    if (field === 'phone_number') {
      content = `+1${content}`
    }
    if (field === 'hobbies') {
      content = content.split(',')
    }

    updateInfoRequest(editableData, field, content, accessToken)
  }

  render() {
    const { userData, editableData, toggleChangePasswordModal } = this.props
    return (
      <View style={styles.personalInfoContainer}>
        <InfoRow
          rowLabel='NAME'
          field="name"
          updateInfo={this.packageEditProfile}
          userInfo={`${editableData.first_name} ${editableData.last_name}`}/>
        <InfoRow
          rowLabel='HOBBIES'
          field="hobbies"
          updateInfo={this.packageEditProfile}
          userInfo={Array.isArray(editableData.hobbies) ? editableData.hobbies.join(', ') : editableData.hobbies}/>
        <InfoRow
          rowLabel='OCCUPATION'
          field="occupation"
          updateInfo={this.packageEditProfile}
          userInfo={editableData.occupation}/>
        <InfoRow
          rowLabel='HOMETOWN'
          field="hometown"
          updateInfo={this.packageEditProfile}
          userInfo={editableData.hometown}/>
        <InfoRow
          rowLabel='AGE'
          field="age"
          updateInfo={this.packageEditProfile}
          userInfo={editableData.age}/>
        <View style={styles.privateRowDivider}>
          <Text
            style={styles.mainPrivateText}>
            PRIVATE INFORMATION
          </Text>
          <Text
            style={styles.subPrivateText}>
            Private
          </Text>
          <Icon
            name='question'
            type='evilicon'
            containerStyle={styles.privateIcon} />
        </View>
        <InfoRow
          rowLabel='PHONE'
          field="phone_number"
          updateInfo={this.packageEditProfile}
          userInfo={editableData.phone_number}
          showSwitch={true}/>
        <InfoRow
          rowLabel='EMAIL'
          field="personal_email"
          updateInfo={this.packageEditProfile}
          userInfo={editableData.personal_email}
          autoCapitalize={'none'}
          showSwitch={true}/>
        <InfoRow
          rowLabel='PASSWORD'
          field="password"
          secureText={true}
          toggleChangePasswordModal={toggleChangePasswordModal}
          updateInfo={this.packageEditProfile}/>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userStore.userData,
    editableData: state.userStore.editableData,
    accessToken: state.authStore.accessToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      updateInfoRequest,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoTab)
