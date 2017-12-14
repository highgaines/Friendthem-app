import React, { Component } from 'react';

// Native
import { ScrollView, Text, Image, View, Linking, TouchableOpacity } from 'react-native';
import { Images } from '../../Themes';
import { Icon } from 'react-native-elements';

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
    const { platformName, inverted } = this.props;

    return inverted ? (
      <Icon
        name='facebook'
        type='font-awesome'
        color="#3C5996"
        size={40}
      />
    ) : (
      <Icon
        name='facebook'
        type='font-awesome'
        color="#ffffff"
        size={40}
      />
    )
  }

  render() {
    const {
      platformName,
      userName,
      inverted
    }  = this.props

    const { selected } = this.state;
    const cardStyle = selected ? styles.cardSelected : styles.cardUnselected

    return(
      <TouchableOpacity
        style={inverted ? styles.invertedCard : cardStyle}
        onPress={this.handlePush}
      >
        <View style={styles.socialMediaImage}>
          { this.renderIcon() }
        </View>
        <View style={styles.socialMediaText}>

          <Text
            style={inverted ? styles.platformNameInverted : styles.platformName}
          >
            {platformName}
          </Text>

          <Text style={inverted ? styles.userNameInverted : styles.userName}>
            {userName}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
