import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, ActivityIndicator, Linking, Alert, AppState } from 'react-native'
import * as Animatable from 'react-native-animatable';

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PermissionsStoreActions from '../../Redux/PermissionsStore'
import InviteUsersStoreActions, {
  fetchConnectivityData,
  selectUser,
  storeContactInfo,
  fetchMyFriendsData } from '../../Redux/InviteUsersStore'
import UserStoreActions, { updateTutorialStatus } from '../../Redux/UserStore'

// Libraries
import AndroidOpenSettings from 'react-native-android-open-settings'
import Permissions from 'react-native-permissions'
import Reactotron from 'reactotron-react-native'
import LinearGradient from 'react-native-linear-gradient'
import Contacts from 'react-native-contacts'
import _ from 'lodash'

// Components
import InviteUsersHeader from './InviteUsersHeader'
import SearchContainer from './SearchContainer'
import InviteUsersModal from './InviteUsersModal'
import UsersContainer from '../NearbyUsersScreen/UsersContainer'
import ConnectivityCard from './ConnectivityCard'
import Navbar from '../Navbar/Navbar'
import SuperConnectTutorial from '../TutorialScreens/SuperConnectTutorial'
import withAppStateChange from '../../HOCs/withAppStateChange.js'

// Styles
import styles from '../Styles/InviteUsersScreenStyles'

import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux'
import { RequestContactsPermission } from '../../Utils/functions'
import { Images } from '../../Themes'
import { isIOS, isAndroid } from '../../Utils/constants'

class InviteUsersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      networkTabSelected: false,
      showInviteTutorial: !props.inviteTutorialComplete,
      showConnectivityTutorial: !props.connectivityTutorialComplete,
      showModal: false,
      receivedConnects: [],
      sentConnects:  [],
      fullConnects: [],
      friendsListCategorized: false,
      appState: AppState.currentState,
      returningToApp: false
    }

    this.initialState = this.state
  }

  triggerModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  componentWillMount = () => {
    const { fetchMyFriendsData, fetchConnectivityData, accessToken, storeContactInfo, setNativeContactsPermission } = this.props

    AppState.addEventListener('change', this._handleAppStateChange);

    if (!this.props.nativeContactsPermission) {
      this.contactPermissionCheck(setNativeContactsPermission)
    }
  }

  componentWillUnmount = () => {
    this.setState(this.initialState)
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount = () => {
    const { accessToken, storeContactInfo, nativeContactsPermission } = this.props

    if (nativeContactsPermission) {
      Contacts.getAll( (err, contacts) => {
        if (err === 'denied') {
          console.log('DENIED')
        } else {
          storeContactInfo(contacts)
        }
      })
    } else {
      this.contactPermissionCheck()
    }

    fetchMyFriendsData(accessToken)
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { accessToken, nativeContactsPermission, setNativeContactsPermission, fetchMyFriendsData } = this.props

    if (this.state.returningToApp && !nativeContactsPermission) {
      this.contactPermissionCheck()
    }

    if (nextProps.nativeContactsPermission && !nativeContactsPermission) {
      fetchMyFriendsData(accessToken)
    }
  }

  componentDidUpdate = () => {
    const { myFriends } = this.props
    const { friendsListCategorized } = this.state

    if (myFriends.length && !friendsListCategorized) {
      this.setState({friendsListCategorized: true}, this.categorizeFriendConnections)
    }
  }

  _handleAppStateChange = nextAppState => {
    const returningToApp = this.state.appState.match(/background/) &&
                            nextAppState === 'active'

    this.setState({
      appState: nextAppState,
      returningToApp
     });
  };

  openAppSettings = () => {
    if (isAndroid) {
      AndroidOpenSettings.appDetailsSettings()
    } else {
      Linking.openURL('app-settings:')
    }
  }

  contactPermissionCheck = () => {
    const { setNativeContactsPermission, storeContactInfo } = this.props

    Permissions.check('contacts').then(resp => {
      if (resp === 'authorized') {
        setNativeContactsPermission(true)
        Contacts.getAll( (err, contacts) => {
          if (err === 'denied') {
            console.log('DENIED')
          } else {
            storeContactInfo(contacts)
          }
        })
      } else {
          Alert.alert(
            'Contacts Permissions',
            'friendthem needs permissions to access your contacts in order to invite your friends to use the app!',
            [
              {text: 'Cancel', onPress: () => this.closeModalPermissionCheck(), style: 'cancel'},
              {text: 'App Permissions', onPress: this.openAppSettings}
            ],
            {
              onDismiss: () => this.closeModalPermissionCheck()
            }
          )
      }
    })
  }

  closeModalPermissionCheck = () => {
    if (!this.props.nativeContactsPermission) {
      this.contactPermissionCheck()
    }
  }

  categorizeFriendConnections = () => {
    const { myFriends } = this.props
    let receivedConnects = []
    let sentConnects = []
    let fullConnects = []

    myFriends.forEach(friendInfo => {
      switch (friendInfo.category) {
        case 'received':
          receivedConnects = [...receivedConnects, friendInfo]
          break
        case 'sent':
          sentConnects = [...sentConnects, friendInfo]
          break
        case 'both':
          fullConnects = [...fullConnects, friendInfo]
          break
        default:
          break
      }
    })

    this.setState({
      receivedConnects,
      sentConnects,
      fullConnects,
    })
  }

  completeTutorial = (stateKey, databaseKey) => {
    const { accessToken, updateTutorialStatus } = this.props

    this.setState({ [stateKey]: false}, () => {
      updateTutorialStatus(accessToken, databaseKey, true)
    })
  }

  renderConnectivityCards = categorizedFriendList => {
    const { navigation } = this.props

    return categorizedFriendList && categorizedFriendList.map((friend, idx) => {
      return (
        <ConnectivityCard
          key={`${idx} - ${friend.connection_percentage}`}
          name={friend.first_name ? friend.first_name : "BOB"}
          image={`${friend.picture}`}
          friendData={friend}
          conPct={friend.connection_percentage}
          navigation={navigation}
        />
      )
    })
  }

  render() {
    const {
      fullConnects,
      networkTabSelected,
      receivedConnects,
      sentConnects,
      showModal,
      showInviteTutorial,
      showConnectivityTutorial,
    } = this.state
    const {
      myFriends,
      selectUser,
      navigation,
      fetching,
      fetchConnectivityData,
      accessToken,
      contacts
    } = this.props

    const pluralizeFriends = myFriends && myFriends.length === 1 ? '' : 's'
    const pluralizeContacts = contacts && contacts.length === 1 ? '' : 's'
    const tutorialVisible = showInviteTutorial && !networkTabSelected ||
      showConnectivityTutorial && networkTabSelected

    if (fetching) {
      return(
        <View style={{ height: '50%', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return (
      !tutorialVisible ?
          <LazyloadView style={[{ flex: 1 }, this.state.showModal ? { opacity: 0.1 } : '']}>
            <LinearGradient
              colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
              style={styles.headerGradient}>
              <LazyloadView>
                <Text style={styles.friendCount}>
                  {myFriends && contacts && networkTabSelected ?
                    `${myFriends.length} friend${pluralizeFriends}`
                    :
                    `${contacts.length} friend${pluralizeContacts}` }
                </Text>
              </LazyloadView>
              <LazyloadView style={styles.tabSelectionContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ networkTabSelected: false })}
                  style={[styles.tabItem, networkTabSelected ? null : styles.selected]}>
                  <Text
                    style={[styles.tabText, networkTabSelected ? null : styles.selectedText]}
                    >
                    MY NETWORK
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ networkTabSelected: true })}
                  style={[styles.tabItem, networkTabSelected ? styles.selected : null]}>
                  <Text
                    style={[styles.tabText, networkTabSelected ? styles.selectedText : null]}
                    >
                      ON FRIENDTHEM
                    </Text>
                  </TouchableOpacity>
              </LazyloadView>
            </LinearGradient>
            {!networkTabSelected ?
              <LazyloadView style={{ flex: 1}}>
                <InviteUsersHeader />
                <SearchContainer
                  triggerModal={this.triggerModal}
                  selectUser={selectUser}
                />
            </LazyloadView> :
              <LazyloadScrollView contentContainerStyle={styles.categorizedFriendListContainer}>
                <Animatable.Text
                  animation="slideInUp"
                  style={{
                      padding: 10,
                      fontFamily: 'montserrat',
                      fontWeight: "600",
                      opacity: .5
                    }}>
                  Connectivity
                </Animatable.Text>
                <LazyloadView style={styles.userContainer}>
                  {this.renderConnectivityCards(receivedConnects)}
                </LazyloadView>
                <Animatable.Text
                  style={{
                      padding: 10,
                      fontFamily: 'montserrat',
                      fontWeight: "600",
                      opacity: .5
                    }}>
                  Connectivity
                </Animatable.Text>
                <LazyloadView style={styles.userContainer}>
                  {this.renderConnectivityCards(sentConnects)}
                </LazyloadView>
                <Animatable.Text
                  style={{
                      padding: 10,
                      fontFamily: 'montserrat',
                      fontWeight: "600",
                      opacity: .5
                    }}>
                  Connectivity
                </Animatable.Text>
                <LazyloadView style={styles.userContainer}>
                  {this.renderConnectivityCards(fullConnects)}
                </LazyloadView>
              </LazyloadScrollView>
            }
          </LazyloadView>
        :
        <SuperConnectTutorial
          onPressFunction={
            networkTabSelected ?
              () => this.completeTutorial('showConnectivityTutorial', 'connection_tutorial')
            :
              () => this.completeTutorial('showInviteTutorial', 'invite_tutorial')
          }
          bgImage={networkTabSelected ? Images.connectivityTutorial : Images.inviteTutorial}
        />
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  accessToken: state.authStore.accessToken,
  myFriends: _.orderBy(state.inviteUsersStore.myFriends, ['connection_percentage'], ['desc']),
  fetching: state.inviteUsersStore.fetchingData,
  contacts: state.inviteUsersStore.contactList,
  inviteTutorialComplete: state.userStore.editableData.invite_tutorial,
  connectivityTutorialComplete: state.userStore.editableData.connection_tutorial,
  nativeContactsPermission: state.permissionsStore.nativeContactsPermission
})

const mapDispatchToProps = dispatch => {
  const { setNativeContactsPermission } = PermissionsStoreActions
  return {
    ...bindActionCreators({
      selectUser,
      setNativeContactsPermission,
      fetchConnectivityData,
      storeContactInfo,
      fetchMyFriendsData,
      updateTutorialStatus
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersScreen)
