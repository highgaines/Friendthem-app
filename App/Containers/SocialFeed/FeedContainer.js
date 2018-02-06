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
import SocialFeedStoreActions, { fetchFeed } from '../../Redux/SocialFeedStoreActions'

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedContainerStyles';

class FeedContainer extends Component {
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

const mapStateToProps = (state) => {
  return {
    twitterFeed: state.socialFeed.twitterFeed,
    instagramFeed: state.socialFeed.instagramFeed,
    facebookFeed: state.socialFeed.facebookFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ fetchFeed }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
