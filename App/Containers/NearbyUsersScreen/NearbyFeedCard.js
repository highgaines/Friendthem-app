import React, { Component } from 'react';

// Native
import { Text, View, TouchableOpacity } from 'react-native';

// Components
import ImageCircle from '../UtilityComponents/ImageCircle';
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';

// Libraries
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedCardStyles';

class NearbyFeedCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      platform: ''
    }
  }

  render = () => {
    return(
      <View style={styles.nearbyFeedCardContainer}>
        <View style={styles.header}>

        </View>
        <View style={styles.scrollWheel}>

        </View>
        <ScrollView>

        </ScrollView>
      </View>
    )
  }
}
