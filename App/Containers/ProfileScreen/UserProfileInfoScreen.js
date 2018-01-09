import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import API from '../../Services/Api'
import AuthStoreActions from '../../Redux/AuthStore'
import envConfig from '../../../envConfig'

import styles from '../Styles/UserProfileInfoStyles'

class UserProfileInfoScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userName: '',
			userEmail: '',
			userPassword: '',
			confirmPassword: '',
			checkBoxChecked: false
		}

	}

	componentDidUpdate = prevProps => {
		const { userInfoAdded } = this.props
		if (userInfoAdded && !prevProps.userInfoAdded) {
			console.log(hit)
			this.props.navigation.navigate('UserProfileScreen')
		}
	}

	updateState = (textValue, textName) => {
		this.setState({[textName]: textValue})
	}

	registerUser = () => {
		const { userName, userEmail, userPassword } = this.state
		const api = API.createApi()

		api.postRegister({
			"client_id": envConfig.Development.devClientId,
			"client_secret": envConfig.Development.devClientSecret,
			"grant_type": "password",
			"username": userEmail,
			"password": userPassword,
		}).then(resp =>
			this.props.registerUserRequest(resp)
		)

	}

	render() {
		const { userAccessToken, registerUserRequest } = this.props
		return (
			<View style={styles.userInfoView}>
				<LinearGradient
					colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
					start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
					locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
					style={styles.linearGradient}>
					<Image
						style={styles.friendThemIcon}
						source={require('../../Images/friend_them_icon.png')}/>
					<Text style={styles.headerText}>
						Select a Facebook photo or open the photo gallery
					</Text>
					<Text style={styles.formText}>
						ADD INFORMATION
					</Text>
					<TextInput
						style={styles.formInput}
						onChangeText={(textValue) => this.updateState(textValue, 'userName')}
						placeholder='Name'>
					</TextInput>
					<TextInput
						style={styles.formInput}
						onChangeText={(textValue) => this.updateState(textValue, 'userEmail')}
						placeholder='Email Address'>
					</TextInput>
					<TextInput
						style={styles.formInput}
						onChangeText={(textValue) => this.updateState(textValue, 'userPassword')}
						secureTextEntry={true}
						placeholder='Password'>
					</TextInput>
					<TextInput
						style={[styles.formInput, { marginBottom: 0 }]}
						onChangeText={(textValue) => this.updateState(textValue, 'confirmPassword')}
						secureTextEntry={true}
						placeholder='Confirm Password'>
					</TextInput>
					<CheckBox
						containerStyle={styles.checkboxContainer}
						textStyle={styles.checkBoxText}
						title="By clicking on the 'Start' button you accept our Terms and Conditions"
						uncheckedIcon='square'
						uncheckedColor='#fff'
						checkedIcon='check-square'
						checkedColor='#fff'
						onIconPress={() => this.setState({checkBoxChecked: !this.state.checkBoxChecked})}
						checked={this.state.checkBoxChecked}/>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => this.registerUser()}>
						<Text style={styles.buttonText}>START</Text>
						<Icon
							name='arrow-right'
							type='feather'
							color='#fff'
							iconStyle={styles.buttonIcon}/>
					</TouchableOpacity>
				</LinearGradient>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	userInfoAdded: state.authStore.userInfoAdded
})

const mapDispatchToProps = dispatch => {
	return {
		registerUserRequest: (userObj) => dispatch(AuthStoreActions.register(userObj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileInfoScreen)
