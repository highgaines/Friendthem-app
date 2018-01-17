import React from 'react';
import { StyleSheet } from 'react-native'
import { View, TouchableOpacity, Text, Image, Button } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/';

// Images
import { Images } from '../../Themes';

export default SendInviteRow = props => {
  const { platform, handleInvite } = props
  const renderIcon = () => {
      switch(platform) {
        case 'Text Message':
          return Images.textMessageIcon
        case 'FB Messenger':
          return Images.messengerIcon
      }
  }

  return(
    <View style={styles.inviteRowContent}>
        <Image
          source={renderIcon()}
        />
        <Text style={styles.text}>
          Send request through {platform}
        </Text>
        <Button
          title="Invite"
          onPress={() => handleInvite()}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  inviteRowContent: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 5
  }
})
