import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../../Themes';
import SearchBar from './SearchBar';
import UsersContainer from './UsersContainer';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

import styles from '../Styles/NearbyUsersScreenStyles';

export default class NearbyUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }
  }

  handleChange = input => {
    this.setState({input: input})
  }

  filterUsers = users => {
    const { input } = this.state
    return users.filter( user => user.name.includes(input) )
  }

  render() {
    const { users, navigation } = this.props
    const { input } = this.state

    return(
      <View style={styles.nearbyUsersContainer}>
        <SearchBar
          numUsers={users.length}
          navigation={navigation}
          handleChange={this.handleChange}
          input={this.state.input}
        />
        <UsersContainer
          users={input.length ? this.filterUsers(users) : users}/>
      </View>
    )
  }
}
