import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Button, View } from 'react-native';
import { connect } from 'react-redux';
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard';

// Styles
import styles from '../Styles/UsersContainerStyles';

export default class PlatformsContainer extends Component {
  constructor(props) {
    super(props)
  }

  renderSocialMediaCards = () => {
    const { platforms, inverted } = this.props
    const platformCards =
      platforms.map( (platObj,i) =>
    <SocialMediaCard
      key={i}
      selected={platObj.selected}
      platformName={platObj.platformName}
      userName={platObj.userName}
      inverted={inverted}
    /> )

    return platformCards
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.socialAccountContainer}>
        { this.renderSocialMediaCards() }
      </ScrollView>
    )
  }
}
