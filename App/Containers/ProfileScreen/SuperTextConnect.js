import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import Communications from 'react-native-communications'
import { Icon } from 'react-native-elements'
import envConfig from '../../../envConfig'


import styles from '../Styles/SuperConnectBarStyles'

export default function SuperTextConnect(props) {
  const { profileLinks, userId } = props

  const sendProfileMessage = () => {
    const messageIntro = 'Check out my profiles! \n\n'
    const messageAppLink = `That's a lot of links, friendthem can help make connecting even easier! Download it here: ${envConfig.Development.appServerRootURL}/invites/check/${userId}/`

    Communications.text(null, `${messageIntro}${profileLinks}${messageAppLink}`)
  }
  return (
    <View style={styles.superTextConnectContainer}>
      <TouchableOpacity onPress={sendProfileMessage}>
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
