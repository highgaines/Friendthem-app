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
            color: 'white',
            fontSize: 13,
            alignSelf: 'center',
            marginTop: 10
          }}>
            Choose another login option
          </Text>
        </TouchableOpacity>
        : null
      }
    </View>
  )
}
