import React, { Component } from 'react'

// Components
import { View, TouchableOpacity, Text, Button, TextInput, ScrollView } from 'react-native'
import InfoRow from './InfoRow'

// Libraries
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

  componentDidMount = () => {
    this.determineEmptyFields()
  }

  determineEmptyFields = () => {
    const { editableData, toggleInfoHelp } = this.props
    let count = 0

    Object.values(editableData).forEach( value => {
      if( value === null ) {
        count++
      }
    })

    if( count > 3 ){
      setTimeout(() => toggleInfoHelp(), 800)
    }
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

  updatePrivacy = (field, status) => {
    this.packageEditProfile(field, status);
  }

  render() {
    const { userData, editableData, toggleChangePasswordModal } = this.props

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        style={styles.personalInfoContainer}>
        <InfoRow
          rowLabel='NAME'
          field="name"
          updateInfo={this.packageEditProfile}
          userInfo={`${userData.first_name || ''} ${userData.last_name || ''}`}/>
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
          testID='age'
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
          userInfo={editableData && editableData.phone_number && editableData.phone_number.replace("+", "")}
          switchToggled={editableData.phone_is_private}
          showSwitch={true}
          switchCallback={status => this.updatePrivacy('phone_is_private', status)}/>
        <InfoRow
          rowLabel='EMAIL'
          field="personal_email"
          updateInfo={this.packageEditProfile}
          userInfo={editableData.personal_email}
          switchToggled={editableData.email_is_private}
          autoCapitalize={'none'}
          showSwitch={true}
          switchCallback={status => this.updatePrivacy('email_is_private', status)}/>
        <InfoRow
          rowLabel='PASSWORD'
          field="password"
          secureText={true}
          toggleChangePasswordModal={toggleChangePasswordModal}
          updateInfo={this.packageEditProfile}/>
      </KeyboardAwareScrollView>
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
      updateInfoRequest
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoTab)
