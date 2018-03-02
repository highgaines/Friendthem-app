import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
export default Footer = props => {
  const { styles, navigationCallback, onLoginScreen, launchScreenNavigation, isLaunchScreen } = props
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
      {
        !isLaunchScreen
        ? <TouchableOpacity
          style={styles.backContainer}
          onPress={launchScreenNavigation}
          >
          <Text style={{
            top: 10,
            color: 'white',
            fontSize: 12,
            alignSelf: 'center'
          }}>
            Back to Launch Screen
          </Text>
        </TouchableOpacity>
        : null
      }
    </View>
  )
}
