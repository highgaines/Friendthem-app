import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';

// Redux
import { bindActionCreators } from 'redux';
import { selectUser, fetchConnectivityData } from '../../Redux/InviteUsersStore';

// Libraries
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

  render() {
    const { networkTabSelected, showModal } = this.state;
    const { selectUser, selectedUser, navigation } = this.props

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
              {networkTabSelected ? '3 friends' : '7 friends' }
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
            <View style={styles.userContainer}>
              <ConnectivityCard
                name="Bruce Wayne"
                image={'https://images.forbes.com/media/lists/fictional/2011/bruce-wayne_197x282.jpg'}
                conPct={100}
              />
              <ConnectivityCard
                name="Clark Kent"
                image={'https://i.ytimg.com/vi/6UuTd4pKHPo/maxresdefault.jpg'}
                conPct={80}
              />
              <ConnectivityCard
                name="Peter Parker"
                image={'https://qph.ec.quoracdn.net/main-qimg-b494e2e5ec0277770bed6c793c3570b9-c'}
                conPct={30}
              />
            </View>
          </View>
        }
        <Navbar
          navbarStyle={styles.navbar}
          navigation={navigation}
          current="Friends"
          margin={607}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  selectedUser: state.inviteUsersStore.selectedUser,
  nav: state.nav,
  accessToken: state.authStore.accessToken
})

const mapDispatchToProps = dispatch => {

  return {
    ...bindActionCreators({ selectUser, fetchConnectivityData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersScreen)
