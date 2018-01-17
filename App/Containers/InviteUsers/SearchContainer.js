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
    const { userList } = this.props
    return userList.map( user =>
      <UserCard
        userImage={user.image}
        userName={user.name}
        userPlatforms={user.platforms}
      /> )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
          </View>
          {this.renderUserList()}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  userList: state.inviteUsersStore.userList
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ sendInviteToUser }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
