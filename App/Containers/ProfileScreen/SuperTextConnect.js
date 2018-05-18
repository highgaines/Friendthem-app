import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import Communications from 'react-native-communications'
import { Icon } from 'react-native-elements'
import envConfig from '../../../envConfig'


import styles from '../Styles/SuperConnectBarStyles'

export default function SuperTextConnect({ profileLinks, userId }) {

  const sendProfileMessage = () => {
    const messageIntro = 'Check out my profiles! \n\n'
    const messageAppLink = `That's a lot of links, friendthem® can help make connecting even easier!\nDownload it here: ${envConfig.Development.appServerRootURL}/invites/check/${userId}/`

    Communications.text(null, `${messageIntro}${profileLinks}${messageAppLink}`)
  }
  return (
    <View style={styles.superTextConnectContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
        onPress={sendProfileMessage}>
        <Icon
          name='md-mail'
          type='ionicon'
          color='#ffffff'
          size={24}
          containerStyle={styles.superTextConnectIcon}
          />
        <Text style={styles.superTextConnectText}>Super Text Connect</Text>
      </TouchableOpacity>
    </View>
  )
}
