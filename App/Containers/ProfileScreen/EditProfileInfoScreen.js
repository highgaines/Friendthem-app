import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, Switch, View, ScrollView, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

import styles from '../Styles/EditProfileInfoStyles'

import PersonalInfoTab from './PersonalInfoTab'
import SocialMediaInfoTab from './SocialMediaInfoTab'

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
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.headerGradient}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={this.returnToProfile}
              style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Image
              style={styles.headerImage}
              source={{uri: `${userInfo.picture.data.url}`}} />
            <TouchableOpacity style={[styles.headerButton, {marginLeft: 20}]}>
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabSelectionContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ infoTabSelect: true })}
              style={[styles.tabItem, infoTabSelect ? styles.selected : null]}>
              <Text
                style={[styles.tabText, infoTabSelect ? styles.selectedText : null]}
                >
                PERSONAL INFO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ infoTabSelect: false })}
              style={[styles.tabItem, infoTabSelect ? null : styles.selected]}>
              <Text
                style={[styles.tabText, infoTabSelect ? null : styles.selectedText]}
                >
                SOCIAL NETWORK
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <ScrollView style={styles.tabDisplay}>
          {
            infoTabSelect ? <PersonalInfoTab /> : <SocialMediaInfoTab />
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userData
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileInfoScreen)
