import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
          style={styles.linearGradient}
          >
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Image source={Images.launch} style={styles.logo} />
            </View>

            <View style={styles.section} >
              <Image source={Images.ready} />
              <Text style={styles.sectionText}>
                Naz is a noob
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}
