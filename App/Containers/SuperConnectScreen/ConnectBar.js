import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Button } from 'react-native';
import Image from 'react-native-remote-svg';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../Styles/ConnectBarStyles';
import { determineImage } from '../../Utils/constants'
import { Images } from '../../Themes';
import { Icon } from 'react-native-elements'

export default ConnectBar = props => {
  const { userData, friendInfo, copy } = props

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
        style={styles.linearGradient}
        >
          <View style={styles.rows}>
            <Text style={styles.titleRow}>
              {
                copy.includes('Super Connect')
                ? 'Super Connect'
                : 'Friend Them'
              }
            </Text>
            <View style={styles.userRow}>
              <View style={styles.column}>
                <View style={styles.picAndName}>
                  {
                    userData.picture ?
                    <Image style={styles.image} source={{uri: userData.picture}} />
                    :
                    <Icon
                      containerStyle={styles.image}
                      name='ios-person'
                      type='ionicon'
                      size={105}
                      color='#000' />
                  }
                  <Text
                     style={styles.name}
                     numberOfLines={1}
                     > {userData.name} </Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.friendThemLogo}>
                  <Image
                    style={styles.superConnectIcon}
                    source={Images.newSuperConnectIcon} />
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.picAndName}>
                  <Image
                    source={determineImage(friendInfo)} style={styles.image}
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
