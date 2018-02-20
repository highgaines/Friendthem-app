import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default Footer = props => {
  const { styles, navigationCallback, onLoginScreen } = props
  return(
    <View style={styles.footerContainer}>
      <Text style={styles.text}> Do you already have an account? </Text>
      <TouchableOpacity
        testID={'login_button'}
        style={styles.button}
        onPress={navigationCallback}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
          { onLoginScreen ? 'SIGN UP HERE!' : 'LOG IN HERE!' }
        </Text>
      </TouchableOpacity>
    </View>
  )
}
