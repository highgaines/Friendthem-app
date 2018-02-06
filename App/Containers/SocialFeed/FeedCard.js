import React, { Component } from 'react';


// Native
import { Text, View, Linking, TouchableOpacity } from 'react-native';
import { Images } from '../../Themes';
import { Icon } from 'react-native-elements';

// Redux
import { connect } from 'react-redux';

// Styles
import styles from '../Styles/FeedCardStyles';

export default class FeedCard extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render = () => {
    return(
      <View style={styles.cardContainer}>
        <Text> Feed Card </Text>
      </View>
    )
  }
}
