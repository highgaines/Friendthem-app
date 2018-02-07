import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    height: 200,
    width: 300,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white'
  }
})
