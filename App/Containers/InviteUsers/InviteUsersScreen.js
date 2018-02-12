import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InviteUsersStoreActions, { selectUser, fetchConnectivityData } from '../../Redux/InviteUsersStore';

// Libraries
import Reactotron from 'reactotron-react-native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import InviteUsersHeader from './InviteUsersHeader';
import SearchContainer from './SearchContainer';
import InviteUsersModal from './InviteUsersModal';
import UsersContainer from '../NearbyUsersScreen/UsersContainer';
import ConnectivityCard from './ConnectivityCard';
import Navbar from '../Navbar/Navbar';

// Styles
import styles from '../Styles/InviteUsersScreenStyles';

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
    const { fetchConnectivityData, accessToken } = this.props
    fetchConnectivityData(accessToken)
  }

  renderConnectivityCards = () => {
    const { friends, navigation } = this.props

    return friends.map( (friend, idx) => {
      return(
        <ConnectivityCard
          key={idx}
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
    const { networkTabSelected, showModal } = this.state;
    const { friends, selectUser, selectedUser, navigation, fetchConnectivityData, accessToken } = this.props

    return (
      <View style={[{ flex: 1 }, this.state.showModal ? { opacity: 0.1 } : '']}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.headerGradient}>
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <InviteUsersModal
              showModal={showModal}
              modalStyle={styles.modal}
              triggerModal={this.triggerModal}
              selectedUser={selectedUser}
            />
          </View>
          <View>
            <Text style={styles.friendCount}>
              {networkTabSelected ? `${friends.length} friends` : `${friends.length} friends` }
            </Text>
          </View>
          <View style={styles.tabSelectionContainer}>
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
          </View>
        </LinearGradient>
        {!networkTabSelected ?
          <View style={{ flex: 1}}>
            <InviteUsersHeader />
            <SearchContainer
              triggerModal={this.triggerModal}
              selectUser={selectUser}
            />
          </View> :
          <View>
            <Text
              style={{
                  padding: 10,
                  fontFamily: 'montserrat',
                  fontWeight: "600",
                  opacity: .5
                }}>
              Connectivity
            </Text>
            <ScrollView contentContainerStyle={styles.userContainer}>
              {this.renderConnectivityCards()}
            </ScrollView>
          </View>
        }

      </View>
    )
  }
}

const mapStateToProps = state => ({
  selectedUser: state.inviteUsersStore.selectedUser,
  nav: state.nav,
  accessToken: state.authStore.accessToken,
  friends: state.inviteUsersStore.connectivityData
})

const mapDispatchToProps = dispatch => {

  return {
    ...bindActionCreators({ selectUser, fetchConnectivityData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersScreen)
