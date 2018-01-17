import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';

// Redux
import { bindActionCreators } from 'redux';
import { selectUser } from '../../Redux/InviteUsersStore';

// Libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import InviteUsersHeader from './InviteUsersHeader';
import SearchContainer from './SearchContainer';
import InviteUsersModal from './InviteUsersModal';

// Styles
import styles from '../Styles/InviteUsersScreenStyles';

class InviteUsersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      networkTabSelected: true,
      showModal: false
    }
  }

  triggerModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { networkTabSelected, showModal } = this.state;
    const { selectUser, selectedUser } = this.props

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
              450 friends
            </Text>
          </View>
          <View style={styles.tabSelectionContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ networkTabSelected: true })}
              style={[styles.tabItem, networkTabSelected ? styles.selected : null]}>
              <Text
                style={[styles.tabText, networkTabSelected ? styles.selectedText : null]}
                >
                ON FRIENDTHEM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ networkTabSelected: false })}
              style={[styles.tabItem, networkTabSelected ? null : styles.selected]}>
              <Text
                style={[styles.tabText, networkTabSelected ? null : styles.selectedText]}
                >
                MY NETWORK
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {networkTabSelected ?
          <View style={{ flex: 1}}>
            <InviteUsersHeader />
            <SearchContainer
              triggerModal={this.triggerModal}
              selectUser={selectUser}
            />
          </View> : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  selectedUser: state.inviteUsersStore.selectedUser
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ selectUser }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersScreen)
