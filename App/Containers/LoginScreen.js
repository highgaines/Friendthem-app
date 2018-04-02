import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Image, View, TouchableOpacity } from 'react-native'

// Components
import Footer from './UtilityComponents/Footer'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthStoreActions, { login } from '../Redux/AuthStore'
import PermissionsStoreActions from '../Redux/PermissionsStore'

// Libraries
import { CheckBox, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import Permissions from 'react-native-permissions'
import Analytics from 'analytics-react-native'

// Styles
import styles from './Styles/UserProfileInfoStyles'

// ENV
import envConfig from '../../envConfig'

const analytics = new Analytics(envConfig.Development.SegmentAPIKey)

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
    const { userEmail, userPassword, userStore } = this.state

    this.props.loginUser({
      username: userEmail,
      password: userPassword
    })

    analytics.track({
      userId: userStore && userStore.userId ? userStore.userId : 'anonymousId',
      event: 'Login User Request',
      properties: {
        username: userEmail
      }
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
            testID={'email_input'}
            style={styles.formInput}
            onChangeText={(textValue) => this.updateState(textValue, 'userEmail')}
            placeholder='Email Address'
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus={true}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderFontColor='#85919a'>
          </TextInput>
          <TextInput
            testID={'password_input'}
            style={styles.formInput}
            onChangeText={(textValue) => this.updateState(textValue, 'userPassword')}
            secureTextEntry={true}
            autoCorrect={false}
            underlineColorAndroid='rgba(0,0,0,0)'
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
            testID={'start_button'}
            style={[styles.loginButtonStyle, { marginTop: 20 }]}
            onPress={() => this.loginRequest()}>
            <Text style={styles.buttonText}>START</Text>
            <Icon
              name='arrow-right'
              type='feather'
              color='#fff'
              iconStyle={styles.buttonIcon}/>
          </TouchableOpacity>
          <View style={styles.footerOffset}>
            <Footer
              navigationCallback={() =>
                this.props.navigation.navigate('RegisterUserScreen')
              }
              launchScreenNavigation={
                () => this.props.navigation.navigate('LaunchScreen')
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
  authError: state.authStore.authError,
  loggedIn: state.authStore.loggedIn,
  locationPermission: state.permissionsStore.nativeGeolocation,
  notificationPermission: state.permissionsStore.nativeNotifications,
  userStore: state.userStore
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      loginUser: login,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
