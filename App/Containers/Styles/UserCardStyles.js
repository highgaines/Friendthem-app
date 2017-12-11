import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    backgroundColor: 'white',
    width: '33%',
    height: 100
  },
  cardImage: {
    borderRadius: 100/2,
    width: 100,
    height: 100
  }
})
