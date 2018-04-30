import React, { Component } from 'react';
import { AppState } from 'react-native'

const withAppStateChange = Component => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      returningToApp: false
    }
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  };

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  _handleAppStateChange = nextAppState => {
    const returningToApp = this.state.appState.match(/background/) &&
                            nextAppState === 'active'

    this.setState({
      appState: nextAppState,
      returningToApp
     });
  };

  render() {
    return(
      <Component
        {...this.props}
        appState={this.state.appState}
        returningToApp={this.state.returningToApp}
      />
    )
  }
}

export default withAppStateChange
