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
    alert('hit')
    this.setState({ selected: !this.state.selected },
      this.props.socialAuth()
    )
  }

  renderIcon = () => {
    const { platformName, inverted } = this.props;

    return inverted ? (
      <Icon
        name={platformName.toLowerCase()}
        type='font-awesome'
        color="#3C5996"
        size={40}
      />
    ) : (
      <Icon
        name={platformName.toLowerCase()}
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
      inverted,
      socialAuth
    }  = this.props
    const { selected } = this.state;
    const cardStyle = selected ? styles.cardSelected : styles.cardUnselected

    return (
      <TouchableOpacity
        style={inverted ? styles.invertedCard : cardStyle}
        onPress={() => alert('hi')}
      >
        {
          selected ?
          <Icon
            name='check-circle'
            type='font-awesome'
            color={'#3C5996'}
            onPress={() => alert('hi from icon')}
            containerStyle={styles.checkIcon} /> : null
        }
        <View style={styles.socialMediaImage}>
          { this.renderIcon() }
        </View>
        <View style={styles.socialMediaText}>

          <Text
            onPress={() => alert('hi from text')}
            style={inverted ? styles.platformNameInverted : styles.platformName}
          >
            {platformName}
          </Text>

          <Text
            onPress={() => alert('hi from text2')}
            style={inverted ? styles.userNameInverted : styles.userName}>
            {userName}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
