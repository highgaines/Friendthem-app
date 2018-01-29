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

  render() {
    const { userData, updateInfo, updateInfoRequest, accessToken } = this.props
    return (
      <View style={styles.personalInfoContainer}>
        <InfoRow
          rowLabel='NAME'
          field="name"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={userData.name}/>
        <InfoRow
          rowLabel='HOBBIES'
          field="hobbies"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={Array.isArray(userData.hobbies) ? userData.hobbies.join(', ') : userData.hobbies}/>
        <InfoRow
          rowLabel='OCCUPATION'
          field="occupation"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={userData.occupation}/>
        <InfoRow
          rowLabel='HOMETOWN'
          field="location"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={userData.hometown}/>
        <InfoRow
          rowLabel='AGE'
          field="age"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={userData.age}/>
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
          field="phoneNumber"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={userData.phone_number}
          showSwitch={true}/>
        <InfoRow
          rowLabel='EMAIL'
          field="email"
          updateInfo={updateInfoRequest}
          accessToken={accessToken}
          userInfo={userData.email}
          showSwitch={true}/>
        <InfoRow
          rowLabel='PASSWORD'
          field="password"
          updateInfo={updateInfo}
          userInfo='********'/>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userStore.userData,
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
