import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';

// Components
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';

// Libraries
import LinearGradient from 'react-native-linear-gradient';

// Styles
import styles from '../Styles/ScrollWheelStyles';

export default class ScrollWheel extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { handlePlatformChange } = this.props
    return (
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
          style={styles.linearGradient}
          >
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.container}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              >
            <View style={styles.platforms}>
              <TouchableOpacity onPress={() => handlePlatformChange('twitter')}>
                <SMPlatformCircle platform="twitter" size={70}/>
                <Text style={styles.text}> Twitter </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="facebook" size={70}/>
                <Text style={styles.text}> Facebook </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="snapchat" size={70}/>
                <Text style={styles.text}> Snapchat </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="youtube" size={70}/>
                <Text style={styles.text}> Youtube </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="twitter" size={70}/>
                <Text style={styles.text}> Twitter </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="twitter" size={70}/>
                <Text style={styles.text}> Twitter </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="twitter" size={70}/>
                <Text style={styles.text}> Twitter </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SMPlatformCircle platform="twitter" size={70}/>
                <Text style={styles.text}> Twitter </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
    )
  }
}
