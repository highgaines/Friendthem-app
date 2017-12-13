import React, { Component } from 'react';

// Native
import { ScrollView, Text, Image, View, Linking, TouchableOpacity } from 'react-native';
import { Images } from '../../Themes';
import { SocialIcon } from 'react-native-elements';

// Redux
import { connect } from 'react-redux';
// import SocialMediaCardRedux from '../Redux/SSMCStore';

// Styles
import styles from '../Styles/SocialMediaCardStyles';

export default class SocialMediaCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: props.selected
    }
  }

  handlePush = () => {
    this.setState({selected: !this.state.selected})
  }

  renderIcon = () => {
    const { platformName } = this.props;

    return (
      <SocialIcon type={platformName} />
    )
  }

  render() {
    const {
      platformName,
      userName
    }  = this.props

    const { selected } = this.state;

    return(
      <TouchableOpacity
        style={selected
          ? styles.cardSelected
          : styles.cardUnselected}
        onPress={this.handlePush}
      >
        <View style={styles.socialMediaImage}>
          { this.renderIcon() }
        </View>

        <View style={styles.socialMediaText}>

          <Text style={styles.platformName}>
            {platformName}
          </Text>

          <Text style={styles.userName}>
            {userName}
          </Text>

        </View>
      </TouchableOpacity>
    )
  }
}
