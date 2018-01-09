import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'

// creates the store
export default (rootReducer, rootSaga) => {
	/* ------------- Redux Configuration ------------- */

	const middleware = []
	const enhancers = []

	/* ------------- Analytics Middleware ------------- */
	middleware.push(ScreenTracking)

	/* ------------- Saga Middleware ------------- */

	const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
	const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
	middleware.push(sagaMiddleware)

	/* ------------- Thunk Middleware ------------- */

	middleware.push(thunk)

	/* ------------- Assemble Middleware ------------- */

	enhancers.push(applyMiddleware(...middleware))

	/* ------------- AutoRehydrate Enhancer ------------- */

	// add the autoRehydrate enhancer
	if (ReduxPersist.active) {
		enhancers.push(autoRehydrate())
	}

	// if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
	const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
	const store = createAppropriateStore(rootReducer, compose(...enhancers))

	// configure persistStore and check reducer version number
	if (ReduxPersist.active) {
		Rehydration.updateReducers(store)
	}

	// kick off root saga
	let sagasManager = sagaMiddleware.run(rootSaga)

	return {
		store,
		sagasManager,
		sagaMiddleware
	}
}
