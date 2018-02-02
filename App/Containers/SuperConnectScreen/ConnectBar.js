import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../Styles/ConnectBarStyles';

export default ConnectBar = props => {
  const { userData, friendInfo } = props
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
        style={styles.linearGradient}
        >
          <View style={styles.rows}>
            <Text style={styles.titleRow}> Super Connect </Text>
            <View style={styles.userRow}>
              <View style={styles.column}>
                <View style={styles.picAndName}>
                  <Image
                    source={{ uri: `${userData.picture}` }} style={styles.image}
                  />

                  <Text
                     style={styles.name}
                     numberOfLines={1}
                     > {userData.name} </Text>
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
                    source={{uri: `${friendInfo.picture}`}} style={styles.image}
                  />
                  <Text
                    style={styles.name}
                    numberOfLines={1}
                    > {friendInfo.name} </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
    </View>
  )
}
