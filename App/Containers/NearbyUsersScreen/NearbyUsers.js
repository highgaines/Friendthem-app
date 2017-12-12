import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../../Themes';
import SearchBar from './SearchBar';
import UsersContainer from './UsersContainer';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../Styles/NearbyUsersScreenStyles';

export default class NearbyUsers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { users } = this.props
    return(
      <View style={styles.nearbyUsersContainer}>
        <SearchBar numUsers={users.length}/>
        <UsersContainer users={users}/>
      </View>
    )
  }
}
