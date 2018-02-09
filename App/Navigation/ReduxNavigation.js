import React from 'react'
import { View } from 'react-native'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { addListener } from './Utils'
import Navbar from '../Containers/Navbar/Navbar'
import { NAVBAR_RENDER_OK } from '../Utils/constants'

// here is our redux-aware smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
    addListener
  })

  function renderNavBar() {
    const currentRouteName = nav.routes[nav.routes.length - 1].routeName
    if (NAVBAR_RENDER_OK.includes(currentRouteName)) {
      return <Navbar navigation={navigation}/>
    }
  }

  return(
    <View style={{flex: 1}}>
      <AppNavigation
        navigation={navigation}
      />
      {renderNavBar()}
    </View>
  )
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
