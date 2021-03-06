import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, StatusBar, AppState, Platform } from 'react-native'

import ReduxNavigation from '../Navigation/ReduxNavigation'
import ReduxPersist from '../Config/ReduxPersist'
import Navbar from './Navbar/Navbar'
import withAppStateChange from '../HOCs/withAppStateChange';

// Actions
import { refreshAuthToken } from '../Redux/AuthStore'
import { updateUserPosition} from '../Redux/UserStore'

// Styles
import styles from './Styles/RootContainerStyles'

const ACTIVE = "active";

class RootContainer extends Component {
  constructor() {
    super()

    this.state = {
      error: ''
    }
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  asyncAuthTokenUpdate = async (refreshToken) => {
    await this.props.refreshAuthToken(refreshToken)
  }

  componentWillReceiveProps = nextProps => {
    const {
      appState,
      accessToken,
      refreshToken,
      updateUserPosition,
      refreshAuthToken,
      authExpiration
    } = this.props;

    const now = Date.now()
    const isExpired = now - authExpiration >= 0

    if (isExpired) {
      this.asyncAuthTokenUpdate(refreshToken)
    }
  }


  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  refreshToken: state.authStore.refreshToken,
  accessToken: state.authStore.accessToken,
  authExpiration: state.authStore.authExpiration
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    refreshAuthToken,
    updateUserPosition
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppStateChange(RootContainer));
