import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

// Redux
import InviteUsersStore from '../../Redux/InviteUsersStore'
import { sendInviteToUser } from '../../Redux/InviteUsersStore'

// Styles
import styles from '../Styles/SearchBarStyles';

// Components
import UserCard from './UserCard';

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
        <ScrollView contentContainerStyle={styles.searchContainer}>
          {this.renderUserList()}
        </ScrollView>
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
