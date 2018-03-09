import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TextInput, View, FlatList } from 'react-native';

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
      input: '',
      searchableContactList: props.contactList
    }
  }

  renderSearchForm = () => {
    const { contactList } = this.props;
    const { input } = this.state;

    return (
      <TextInput
        style={styles.searchForm}
        onChangeText={searchTerm => {
          const nameArray = ["givenName", "familyName"];
          const filteredContactList = contactList.filter(contact => (
            nameArray.some(nameKey => (
              contact[nameKey]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ))
          ))

          this.setState({
            input: searchTerm,
            searchableContactList: filteredContactList
          });
        }}
        value={input}
      />
    )
  }

  render() {
    const { triggerModal, selectUser } = this.props;
    const { searchableContactList } = this.state;

    return (
        <LazyloadScrollView contentContainerStyle={styles.searchContainer}>
          {this.renderSearchForm()}
          <FlatList
            data={searchableContactList}
            renderItem={({item}) => (
              <UserCard
                firstName={item.givenName}
                lastName={item.familyName}
                phoneNumbers={item.phoneNumbers}
                emailAddresses={item.emailAddresses}
                triggerModal={triggerModal}
                selectUser={selectUser}
              />
            )}
          />
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
