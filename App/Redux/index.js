import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { reducer as network } from 'react-native-offline';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  fbStore: require('./FBStore').reducer,
  userStore: require('./UserStore').reducer,
  friendStore: require('./FriendStore').reducer,
  authStore: require('./AuthStore').reducer,
  notificationStore: require('./NotificationStore').reducer,
  inviteUsersStore: require('./InviteUsersStore').reducer,
  permissionsStore: require('./PermissionsStore').reducer,
  tokenStore: require('./TokenRedux').reducer,
  superConnect: require('./SuperConnectStore').reducer,
  socialFeed: require('./SocialFeedStore').reducer,
  network: network
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
