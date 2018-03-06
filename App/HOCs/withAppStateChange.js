import React, { Component } from 'react';
import { AppState } from 'react-native'

const withAppStateChange = Component => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
    }
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  };

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  _handleAppStateChange = nextAppState => {
    this.setState({ appState: nextAppState });
  };

  render() {
    return(
      <Component
        {...this.props}
        appState={this.state.appState}
      />
    )
  }
}

export default withAppStateChange
