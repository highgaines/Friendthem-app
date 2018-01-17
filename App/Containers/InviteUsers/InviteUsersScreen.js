import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';

// Libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import InviteUsersHeader from './InviteUsersHeader';
import SearchContainer from './SearchContainer';

// Styles
import styles from '../Styles/InviteUsersScreenStyles';

export default class InviteUsersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      networkTabSelected: true
    }
  }

  render() {
    const { networkTabSelected } = this.state;
    return (
      <View style={{ flex: 1}}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.headerGradient}>
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
        {networkTabSelected ? <InviteUsersHeader /> : null}
        <SearchContainer />
      </View>
    )
  }
}
