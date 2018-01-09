import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import API from '../Services/Api'
import envConfig from '../../envConfig'

const api = API.createApi()

const { Types, Creators } = createActions({
	register: null
})

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
	loggedIn: false,
	accessToken: null,
	expiresIn: null,
	tokenType: null,
	scope: null,
	refreshToken: null
})

export const registerAccount = (state = INITIAL_STATE, action) => {
	api.postRegister({
		"client_id": envConfig.Development.devClientId,
		"client_secret": envConfig.Development.devClientSecret,
		"grant_type": "password",
		"username": "johnny123@doe.com",
		"password": "simpelfractal",
	}).then(resp => {
		console.log(resp)
	})
	return state
}

export const reducer = createReducer(INITIAL_STATE, {
	[Types.REGISTER]: registerAccount
})
