import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 130,
    marginTop: 10,
    borderRadius: 10,
    width: 120
  },
  cardImage: {
    borderRadius: 100/2,
    height: 90,
    marginTop: 10,
    width: 100,
  },
  cardText: {
    marginTop: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
})
