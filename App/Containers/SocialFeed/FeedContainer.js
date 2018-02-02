import React, { Component } from 'react'

import { View, TouchableOpacity, Text, Button, ScrollView } from 'react-native';

// Components
import FeedCard from './FeedCard';

// Libraries
import { Icon } from 'react-native-elements';
import Image from 'react-native-remote-svg';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedContainerStyles';

export default class FeedContainer extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount = () => {
    // api call to obtain data
  }

  render = () => {
    const { platform } = this.props

    return(
      <ScrollView style={styles.feedContainer}>
        <Text style={{ fontSize: 30, textAlign: 'center', padding: 100 }}> {platform} feed here </Text>
        <FeedCard />
      </ScrollView>
    )
  }
}
