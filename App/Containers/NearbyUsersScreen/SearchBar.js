import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

// Styles
import styles from '../Styles/SearchBarStyles';

export default class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      input: ''
    }
  }

  render() {
    const { numUsers } = this.props
    return(
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
        style={styles.linearGradient}
      >
        <View style={styles.searchBar}>
          <Icon
            name='search'
            type='evilicon'
            color='#FFF'
          />
          <Text style={styles.numUsers}>
            {numUsers}
          </Text>
        </View>
      </LinearGradient>
    )
  }

}
