import React, { Component } from 'react'

// Components
import { View, TouchableOpacity, Text, Button, TextInput, ScrollView } from 'react-native'
import InfoRow from './InfoRow'

// Libraries
import { Icon } from 'react-native-elements'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserStoreActions, { updateInfo } from '../../Redux/UserStore'

// Styles
import styles from '../Styles/PersonalInfoTabStyles'

class PersonalInfoTab extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { userData, updateInfo } = this.props
    return (
      <View style={styles.personalInfoContainer}>
        <InfoRow
          rowLabel='USER NAME'
          field="name"
          updateInfo={updateInfo}
          userInfo={userData.name}/>
        <InfoRow
          rowLabel='OCCUPATION'
          field="interests"
          updateInfo={updateInfo}
          userInfo={Array.isArray(userData.interests) ? userData.interests.join(', ') : userData.interests}/>
        <InfoRow
          rowLabel='LOCATION'
          field="location"
          updateInfo={updateInfo}
          userInfo={userData.location}/>
        <InfoRow
          rowLabel='AGE'
          field="age"
          updateInfo={updateInfo}
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
          updateInfo={updateInfo}
          userInfo={userData.phoneNumber}
          showSwitch={true}/>
        <InfoRow
          rowLabel='EMAIL'
          field="email"
          updateInfo={updateInfo}
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
    userData: state.userStore.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      updateInfo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoTab)
