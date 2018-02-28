import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TextInput, View } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InviteUsersStore from '../../Redux/InviteUsersStore'
import { sendInviteToUser } from '../../Redux/InviteUsersStore'

// Libraries
import { Icon } from 'react-native-elements';

// Styles
import styles from '../Styles/SearchBarStyles';

// Components
import UserCard from './UserCard';

import { LazyloadScrollView } from 'react-native-lazyload-deux'

class SearchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }
  }

  renderSearchForm = () => {
    return (
      <TextInput
        style={styles.searchForm}
        onChangeText={input => this.props.handleChange(input)}
        value={this.state.input}
      />
    )
  }

  renderUserList = () => {
    const { contactList, triggerModal, selectUser } = this.props
    return contactList.map( (contact, idx) =>
      <UserCard
        key={idx}
        firstName={contact.givenName}
        lastName={contact.familyName}
        phoneNumbers={contact.phoneNumbers}
        emailAddresses={contact.emailAddresses}
        triggerModal={triggerModal}
        selectUser={selectUser}
      /> )
  }

  render() {
    return (
        <LazyloadScrollView contentContainerStyle={styles.searchContainer}>
          {this.renderUserList()}
        </LazyloadScrollView>
    )
  }
}

const mapStateToProps = state => ({
  contactList: state.inviteUsersStore.contactList
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ sendInviteToUser }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
