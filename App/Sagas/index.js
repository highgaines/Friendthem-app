import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.createApi()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
	yield all([
		// some sagas only receive an action

		// some sagas receive extra parameters in addition to an action
	])
}
