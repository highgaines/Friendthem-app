import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

//Styles
import styles from '../Styles/FooterStyles';

export default Footer = props => {
  return(
    <View style={styles.footerContainer}>
      <Text style={styles.text}> Do you already have an account? </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
          LOG IN HERE!
        </Text>
      </TouchableOpacity>
    </View>
  )
}
