import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, Text, TextInput, Image, View, TouchableOpacity } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import Permissions from 'react-native-permissions'

import Footer from './UtilityComponents/Footer'
import AuthStoreActions, { login } from '../Redux/AuthStore'
import PermissionsStoreActions from '../Redux/PermissionsStore'
import styles from './Styles/UserProfileInfoStyles'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userEmail: '',
      userPassword: '',
      rememberMe: false,
    }
  }

  componentDidUpdate = (prevProps) => {
    const {
      loggedIn,
      authError,
      navigation,
      locationPermission,
      notificationPermission
    } = this.props
    const permissionsGranted = locationPermission && notificationPermission

    if (loggedIn && !prevProps.loggedIn) {
      if (permissionsGranted) {
        navigation.navigate('ForkScreen')
      } else if (!locationPermission) {
        navigation.navigate('PermissionScreen', {
          permissionType: 'geolocation', navigation: navigation
        })
      } else {
        navigation.navigate('PermissionScreen', {
          permissionType: 'notifications', navigation: navigation
        })
      }
    }

    if (authError && !prevProps.authError) {
      alert('The information you entered was incorrect')
    }
  }

  updateState = (textValue, textName) => {
    this.setState({[textName]: textValue})
  }

  loginRequest = () => {
    const { userEmail, userPassword } = this.state

    this.props.loginUser({
      username: userEmail,
      password: userPassword
    })
  }

  render() {
    return (
      <View style={styles.userInfoView}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.linearGradient}>
          <Image
            style={styles.friendThemLoginIcon}
            source={require('../Images/logo-friendthem-text.png')}/>
          <Text style={styles.loginFormText}>
            LOG IN
          </Text>
          <TextInput
            style={styles.formInput}
            onChangeText={(textValue) => this.updateState(textValue, 'userEmail')}
            placeholder='Email Address'
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus={true}
            placeholderFontColor='#85919a'>
          </TextInput>
          <TextInput
            style={styles.formInput}
            onChangeText={(textValue) => this.updateState(textValue, 'userPassword')}
            secureTextEntry={true}
            autoCorrect={false}
            placeholder='Password'
            placeholderFontColor='#85919a'>
          </TextInput>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.loginCheckBoxText}
            title="Remember Me"
            uncheckedIcon='square'
            uncheckedColor='#fff'
            checkedIcon='check-square'
            checkedColor='#fff'
            onIconPress={() => this.setState({checkBoxChecked: !this.state.checkBoxChecked})}
            checked={this.state.checkBoxChecked}/>
          <TouchableOpacity
            style={[styles.loginButtonStyle, { marginTop: 20 }]}
            onPress={() => this.loginRequest()}>
            <Text style={styles.buttonText}>START</Text>
            <Icon
              name='arrow-right'
              type='feather'
              color='#fff'
              iconStyle={styles.buttonIcon}/>
          </TouchableOpacity>
          <View style={{ marginTop: 75 }}>
            <Footer
              navigationCallback={() =>
                this.props.navigation.navigate('RegisterUserScreen')
              }
              onLoginScreen={true}
              styles={styles}/>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authStore.loggedIn,
  authError: state.authStore.authError,
  locationPermission: state.permissionsStore.locationPermissionsGranted,
  notificationPermission: state.permissionsStore.notificationPermissionsGranted,
})

const mapDispatchToProps = dispatch => {
  const { loginUser } = AuthStoreActions
  return {
    ...bindActionCreators({
      loginUser: login,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
