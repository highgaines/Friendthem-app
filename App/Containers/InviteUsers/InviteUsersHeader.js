import React from 'react';
import { Text, Image, View, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';

// Styles
import styles from '../Styles/MessageContainerStyles';

export default InviteUsersHeader = props => {

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <Icon
          name="exclamation-circle"
          type="font-awesome"
          color="#000"
        />
        <Text style={styles.firstRowText}>
          Invite friends to join Friend Them!
        </Text>
      </View>
    </View>
  )
}
