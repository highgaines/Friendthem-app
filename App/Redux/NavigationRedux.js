import AppNavigation from '../Navigation/AppNavigation'
import Immutable from 'seamless-immutable'

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state ? Immutable.asMutable(state) : state)
  const stateRouteCheck = newState && newState.routes ? newState : state
  const prevScreenIndex = determineRouteIndex(action.routeName, stateRouteCheck.routes)

  if (action.type === 'LOGOUT_USER') {
    const resetRoutes = [...newState.routes.slice(0, 1)]

    return {
      ...newState,
      index: 0,
      routes: resetRoutes
    }
  }
  if (newState && prevScreenIndex > -1 && prevScreenIndex != newState.index) {
    const updatedRoutes = [...newState.routes.slice(0, prevScreenIndex), ...newState.routes.slice(prevScreenIndex + 1)]

    return {
      ...newState,
      index: newState.index - 1,
      routes: updatedRoutes
    }
  } else {
      return newState || state
  }
}

const determineRouteIndex = (routeName, routes) => {
  return routes.findIndex(route => route.routeName === routeName)
}
