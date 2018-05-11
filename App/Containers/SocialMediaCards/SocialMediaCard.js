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
    return this.props.synced && this.props.connectedWithVisitor || this.props.fromUserProfile && this.props.synced
  }

  onPressFunctionality = () => {
    const { readOnly, connectedWithVisitor, toggleBanner, cardPressed, platformName, fromUserProfile } = this.props
    const userSnapchat = fromUserProfile && platformName === 'Snapchat'

    return connectedWithVisitor && !userSnapchat ?
      toggleBanner : readOnly && !userSnapchat ?
        null : this.handlePush
  }

  renderIcon = () => {
    const { platformName, synced, syncedBGColor, fromUserProfile } = this.props;

    if (this.determineConnectedStatus()) {
      return (
        <Icon
          name={platformName.toLowerCase()}
          type='font-awesome'
          color="#fff"
          size={40}
        />
      )
    } else if (synced) {
      return (
        <Icon
          name={platformName.toLowerCase()}
          type='font-awesome'
          color={syncedBGColor}
          size={40} />
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

  capitalizePlatform = platformName => {
    return platformName.charAt(0).toUpperCase() + platformName.slice(1)
  }

  render() {
    const {
      platformName,
      fromUserProfile,
      userName,
      inverted,
      synced,
      selected,
      socialAuth,
      connectedWithVisitor,
      readOnly,
      syncedBGColor
    }  = this.props
    const userSnapchat = fromUserProfile && platformName === 'Snapchat'

    const cardStyle = this.determineConnectedStatus() ?
       [styles.cardSelected, { backgroundColor: syncedBGColor }] : synced ?
         styles.invertedCard : styles.cardUnselected

    return (
      <TouchableOpacity
        style={cardStyle}
        disabled={(readOnly || connectedWithVisitor) && !userSnapchat}
        activeOpacity={readOnly ? 1 : 0.2 }
        onPress={this.onPressFunctionality()}
      >
        { !this.determineConnectedStatus() && selected ?
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
              styles.platformName : synced ?
                styles.platformNameInverted : styles.unsyncedPlatformName
            }>
            {this.capitalizePlatform(platformName)}
          </Text>

          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={this.determineConnectedStatus() ?
              styles.userName : synced ?
                styles.userNameInverted : styles.unsyncedUserName
            }>
            {userName || 'Sync Account'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
