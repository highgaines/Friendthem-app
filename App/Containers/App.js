import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import codePush from "react-native-code-push"
import { withNetworkConnectivity } from 'react-native-offline'

let codePushOptions = {
  checkFrequency: Platform.OS == 'ios' ? codePush.CheckFrequency.ON_APP_RESUME : null,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE
}

// create our store
const store = createStore()

const RootApp = withNetworkConnectivity({
  withRedux: true,
  timeout: 2000,
  pingServerUrl: 'https://google.com',
  withExtraHeadRequest: true,
  checkConnectionInterval: 5000,
})(RootContainer)

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  render () {
    console.disableYellowBox = true
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? codePush(codePushOptions)(console.tron.overlay(App))
  : codePush(codePushOptions)(App)
