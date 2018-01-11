import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//Styles
import styles from '../Styles/HeaderStyles';

export default Header = props => {
  return (
    <LinearGradient
      colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
      start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
      locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
      style={styles.linearGradient}
    >
      <Text style={styles.headerTitle}> {props.title} </Text>
    </LinearGradient>
  )
}
