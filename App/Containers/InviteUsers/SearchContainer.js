import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TextInput, View, FlatList } from 'react-native';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InviteUsersStore, { createUserInvite } from '../../Redux/InviteUsersStore'


// Libraries
import _ from 'lodash'
import { Icon } from 'react-native-elements';
import { LazyloadScrollView } from 'react-native-lazyload-deux'

// Styles
import styles from '../Styles/SearchBarStyles';

// Components
import UserCard from './UserCard';


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
    const { triggerModal, selectUser, contactList, accessToken, createUserInvite } = this.props;
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
                accessToken={accessToken}
                phoneNumbers={item.phoneNumbers}
                emailAddresses={item.emailAddresses}
                triggerModal={triggerModal}
                inviteUser={createUserInvite}
                selectUser={selectUser}
              />
            )}
          />
        </LazyloadScrollView>
    )
  }
}

const mapStateToProps = state => ({
  contactList: _.sortBy(state.inviteUsersStore.contactList, ['givenName']),
  accessToken: state.authStore.accessToken,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createUserInvite }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
