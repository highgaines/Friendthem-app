import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../Styles/ConnectBarStyles';

export default ConnectBar = props => {
  const { userData, friendData } = props
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
        style={styles.linearGradient}
        >
          <View style={styles.rows}>
            <Text style={styles.titleRow}> Super Connect </Text>
            <View style={styles.userRow}>
              <View style={styles.column}>
                <View style={styles.picAndName}>
                  <Image
                    // replace this with { uri: userData.picture.data.url }
                    source={require('../../Images/wolverine.jpg')} style={styles.image}
                  />

                  <Text
                    // replace with proper names of connecting users
                     style={styles.name}> {'Wolverine'} </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.friendThemLogo}>
                  <Image source={require('../../Images/logowithouttext3.png')} />
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.picAndName}>
                  <Image
                    source={{uri: friendData.image}} style={styles.image}
                  />
                  <Text style={styles.name}> {'Cyclops'} </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
    </View>
  )
}
