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

  determineConnectedStatus = () => {
    return this.props.synced && this.props.connectedWithVisitor
  }

  onPressFunctionality = () => {
    const { readOnly, connectedWithVisitor, toggleBanner } = this.props

    return connectedWithVisitor ?
      toggleBanner : readOnly ?
        null : this.handlePush
  }

  renderIcon = () => {
    const { platformName, synced, syncedBGColor } = this.props;

    if (this.determineConnectedStatus()) {
      return (
        <Icon
          name={platformName.toLowerCase()}
          type='font-awesome'
          color={syncedBGColor}
          size={40} />
      )
    } else if (synced) {
      return (
        <Icon
          name={platformName.toLowerCase()}
          type='font-awesome'
          color="#fff"
          size={40}
        />
      )
    } else {
      return (
        <Icon
          name={platformName.toLowerCase()}
          type='font-awesome'
          color="#ABABAB"
          size={40}
        />
      )
    }
  }

  render() {
    const {
      platformName,
      userName,
      inverted,
      synced,
      selected,
      socialAuth,
      connectedWithVisitor,
      readOnly,
      syncedBGColor
    }  = this.props
    const cardStyle = this.determineConnectedStatus() ?
      styles.invertedCard : synced ?
        [styles.cardSelected, { backgroundColor: syncedBGColor }] : styles.cardUnselected

    return (
      <TouchableOpacity
        style={cardStyle}
        activeOpacity={readOnly ? 1 : 0.2 }
        onPress={this.onPressFunctionality()}
      >
        {
          this.determineConnectedStatus() ?
          <Icon
            name='check-circle'
            type='font-awesome'
            color={'green'}
            containerStyle={styles.checkIcon} /> : selected ?
            <Icon
              name='check-circle'
              type='font-awesome'
              color={'blue'}
              containerStyle={styles.checkIcon} /> : null
        }
        <View style={styles.socialMediaImage}>
          { this.renderIcon() }
        </View>
        <View style={styles.socialMediaText}>

          <Text
            style={this.determineConnectedStatus() ?
              styles.platformNameInverted : synced ?
                styles.platformName : styles.unsyncedPlatformName
            }>
            {platformName}
          </Text>

          <Text
            style={this.determineConnectedStatus() ?
              styles.userNameInverted : synced ?
                styles.userName : styles.unsyncedUserName
            }>
            {userName || 'Sync Account'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
