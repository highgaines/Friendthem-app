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
      searchableContactList: props.contactList,
      contactListUpdated: false
    }
  }

  componentDidUpdate = (prevProps) => {
    const { contactList } = this.props

    if (contactList.length > prevProps.contactList.length) {
      this.setState({
        searchableContactList: contactList,
        contactListUpdated: !this.state.contactListUpdated
      })
    }
  }

  filterContacts = (searchTerm, contactList) => {
    const nameArray = ["givenName", "familyName"];
    return (
      contactList.filter(contact => (
        nameArray.some(nameKey => {
          if (contact[nameKey]) {
            return (
              contact[nameKey]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          }
        })
      ))
    )
  }

  onChangeText = (searchTerm) => {
    const { contactList } = this.props;
    const filteredContactList =
      this.filterContacts(searchTerm, contactList)

    this.setState({
      input: searchTerm,
      searchableContactList: filteredContactList
    });
  }

  renderSearchForm = () => {
    const { input } = this.state;

    return (
      <View
        style={{
          borderColor: 'black',
          borderBottomWidth: 1,
          borderTopWidth: 1
        }}
      >
        <TextInput
          placeholder="Search a friend by name"
          style={styles.searchFormDark}
          onChangeText={searchTerm => this.onChangeText(searchTerm)}
          value={input}
          underlineColorAndroid='rgba(0,0,0,0)'
        />
      </View>
    )
  }

  render() {
    const { triggerModal, selectUser, contactList } = this.props;
    const { searchableContactList, contactListUpdated } = this.state;

    return (
        <LazyloadScrollView contentContainerStyle={styles.searchContainer}>
          {this.renderSearchForm()}
          <FlatList
            keyExtractor={(item) => item.recordID}
            data={searchableContactList}
            extraData={contactListUpdated}
            renderItem={({item, index}) => (
              <UserCard
                key={index}
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
