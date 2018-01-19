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
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.platforms}>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text style={styles.text}> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="facebook" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="snapchat" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="youtube" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SMPlatformCircle platform="twitter" size={60}/>
            <Text> Twitter </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    )
  }
}
