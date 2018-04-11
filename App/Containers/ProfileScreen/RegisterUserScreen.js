import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Button, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import AuthStoreActions, { registerUser } from '../../Redux/AuthStore'
import Footer from '../UtilityComponents/Footer'
import styles from '../Styles/UserProfileInfoStyles'

class RegisterUserScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      userEmail: '',
      userPassword: '',
      confirmPassword: '',
      checkBoxChecked: false
    }

  }

  componentDidUpdate = prevProps => {
    const { userInfoAdded, navigation, nativeGeolocation, nativeNotifications } = this.props

    if (userInfoAdded && !prevProps.userInfoAdded) {
      if (!nativeGeolocation) {
        navigation.navigate('PermissionScreen', {
          permissionType: 'geolocation',
          navigation: navigation,
        })
      } else if (!nativeNotifications) {
        navigation.navigate('PermissionScreen', {
          permissionType: 'notifications',
          navigation: navigation,
        })
      } else {
        navigation.navigate('ForkScreen')
      }
    }
  }

  updateState = (textValue, textName) => {
    this.setState({[textName]: textValue})
  }

  registerUser = () => {
    const { userEmail, userPassword, confirmPassword } = this.state

    confirmPassword === userPassword ?
      this.props.registerUserRequest({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        username: this.state.userEmail,
        password: this.state.userPassword
      })
      :
      alert('Passwords do not match.')
  }

  render() {
    const { userAccessToken, registerUserRequest, navigation } = this.props
    const { checkBoxChecked } = this.state
    return (
      <View style={styles.scrollContainerStyle}>
        <ScrollView contentContainerStyle={styles.userInfoView}>
          <LinearGradient
            colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
            style={styles.linearGradient}>
            <Image
              style={styles.friendThemIcon}
              source={require('../../Images/friend_them_icon.png')}/>
            <Text style={styles.formText}>
              ADD INFORMATION
            </Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(textValue) => this.updateState(textValue, 'firstName')}
              autoCapitalize={'words'}
              autoCorrect={false}
              autoFocus={true}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='First Name'>
            </TextInput>
            <TextInput
              style={styles.formInput}
              onChangeText={(textValue) => this.updateState(textValue, 'lastName')}
              autoCapitalize={'words'}
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='Last Name'>
            </TextInput>
            <TextInput
              style={styles.formInput}
              onChangeText={(textValue) => this.updateState(textValue, 'userEmail')}
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='Email Address'>
            </TextInput>
            <TextInput
              style={styles.formInput}
              onChangeText={(textValue) => this.updateState(textValue, 'userPassword')}
              secureTextEntry={true}
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='Password'>
            </TextInput>
            <TextInput
              style={[styles.formInput, { marginBottom: 0 }]}
              onChangeText={(textValue) => this.updateState(textValue, 'confirmPassword')}
              secureTextEntry={true}
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='Confirm Password'>
            </TextInput>
            <CheckBox
              containerStyle={styles.checkboxContainer}
              title={
                <Text style={styles.checkBoxText}>
                  By clicking on the&nbsp;
                  <Text style={{ fontWeight: '800' }}>
                    "Start"
                  </Text>
                    &nbsp;button you accept our
                  <Text style={{ fontWeight: '800' }}>
                    &nbsp;Terms and Conditions
                  </Text>.
                </Text>
              }
              uncheckedIcon='square'
              uncheckedColor='#fff'
              checkedIcon='check-square'
              checkedColor='#fff'
              onIconPress={() => this.setState({checkBoxChecked: !this.state.checkBoxChecked})}
              checked={checkBoxChecked}/>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={checkBoxChecked ?
                () => this.registerUser()
                :
                () => alert('Please make sure to check the checkbox.')
              }>
              <Text style={styles.buttonText}>START</Text>
              <Icon
                name='arrow-right'
                type='feather'
                color='#fff'
                iconStyle={styles.buttonIcon}/>
            </TouchableOpacity>
            <Footer
              onLoginScreen={false}
              navigationCallback={
                () => navigation.navigate('LoginScreen')
              }
              launchScreenNavigation={
                () => navigation.navigate('LaunchScreen')
              }
              styles={styles} />
          </LinearGradient>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfoAdded: state.authStore.userInfoAdded,
  nativeGeolocation: state.permissionsStore.nativeGeolocation,
  nativeNotifications: state.permissionsStore.nativeNotifications,
})

const mapDispatchToProps = dispatch => {
  return {
    registerUserRequest: (userObj) => dispatch(registerUser(userObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserScreen)
