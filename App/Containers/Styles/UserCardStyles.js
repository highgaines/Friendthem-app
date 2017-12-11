import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 100,
    margin: 3,
    width: 120
  },
  cardImage: {
    borderRadius: 100/2,
    height: 100,
    width: 100
  }
})
