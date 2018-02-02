import React, { Component } from 'react';

// Native
import { ScrollView, Text, Image, View, Linking, TouchableOpacity } from 'react-native';
import { Images } from '../../Themes';
import { Icon } from 'react-native-elements';

// Redux
import { connect } from 'react-redux';

// Styles
import styles from '../Styles/SocialMediaCardStyles';

export default class SocialMediaCard extends Component {

  handlePush = () => {
    this.props.socialAuth(this.props.platformAuth)
  }

  renderIcon = () => {
    const { platformName, synced } = this.props;

    return synced ? (
      <Icon
        name={platformName.toLowerCase()}
        type='font-awesome'
        color="#fff"
        size={40}
      />
    ) : (
      <Icon
        name={platformName.toLowerCase()}
        type='font-awesome'
        color="#ABABAB"
        size={40}
      />
    )
  }

  render() {
    const {
      platformName,
      userName,
      inverted,
      synced,
      selected,
      socialAuth,
      syncedBGColor
    }  = this.props
    const cardStyle = synced ?
      [styles.cardSelected, { backgroundColor: syncedBGColor }]
      :
      styles.cardUnselected

    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={this.handlePush}
      >
        {
          selected ?
          <Icon
            name='check-circle'
            type='font-awesome'
            color={'green'}
            containerStyle={styles.checkIcon} /> : null
        }
        <View style={styles.socialMediaImage}>
          { this.renderIcon() }
        </View>
        <View style={styles.socialMediaText}>

          <Text
            style={synced ? styles.platformName : styles.unsyncedPlatformName }
          >
            {platformName}
          </Text>

          <Text
            style={synced ? styles.userName : styles.unsyncedUserName }>
            {userName || 'Sync Account'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
