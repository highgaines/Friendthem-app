import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  const stateRouteCheck = newState && newState.routes ? newState : state
  const prevScreenIndex = determineRouteIndex(action.routeName, stateRouteCheck.routes)

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
