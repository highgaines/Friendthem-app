import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InviteUsersStoreActions, { selectUser, fetchConnectivityData, storeContactInfo, fetchMyFriendsData } from '../../Redux/InviteUsersStore'

// Libraries
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

// Styles
import styles from '../Styles/InviteUsersScreenStyles'

import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux'

class InviteUsersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      networkTabSelected: false,
      showModal: false
    }
  }

  triggerModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  componentDidMount = () => {
    const { fetchMyFriendsData, fetchConnectivityData, accessToken, storeContactInfo } = this.props
    fetchMyFriendsData(accessToken)
  }

  renderConnectivityCards = () => {
    const { myFriends, navigation } = this.props

    return myFriends && myFriends.map( (friend, idx) => {
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
    const { networkTabSelected, showModal } = this.state
    const {
      myFriends,
      selectUser,
      navigation,
      fetchConnectivityData,
      accessToken,
      contacts
    } = this.props

    const pluralizeFriends = myFriends && myFriends.length === 1 ? '' : 's'
    const pluralizeContacts = contacts && contacts.length === 1 ? '' : 's'

    return (
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
          <LazyloadView>
            <Text
              style={{
                  padding: 10,
                  fontFamily: 'montserrat',
                  fontWeight: "600",
                  opacity: .5
                }}>
              Connectivity
            </Text>
            <LazyloadScrollView contentContainerStyle={styles.userContainer}>
              {this.renderConnectivityCards()}
            </LazyloadScrollView>
          </LazyloadView>
        }

      </LazyloadView>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  accessToken: state.authStore.accessToken,
  friends: state.inviteUsersStore.connectivityData,
  myFriends: _.orderBy(state.inviteUsersStore.myFriends, ['connection_percentage'], ['desc']),
  contacts: state.inviteUsersStore.contactList
})

const mapDispatchToProps = dispatch => {

  return {
    ...bindActionCreators({
      selectUser,
      fetchConnectivityData,
      storeContactInfo,
      fetchMyFriendsData
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersScreen)
