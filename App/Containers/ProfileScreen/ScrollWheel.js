import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';

// Components
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';

// Styles
import styles from '../Styles/ScrollWheelStyles';

export default class ScrollWheel extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
        horizontal={true}
      >
        <View style={styles.platforms}>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={30}/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

          <TouchableOpacity>
            <SMPlatformCircle platform="twitter"/>
          </TouchableOpacity>

        </View>
      </ScrollView>
    )
  }
}
