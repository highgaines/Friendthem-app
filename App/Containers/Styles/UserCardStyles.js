import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 130,
    marginTop: 5,
    borderRadius: 10,
    width: 115,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginHorizontal: 3
  },
  cardImage: {
    borderRadius: 40,
    height: 80,
    marginTop: 10,
    width: 80,
  },
  cardText: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  }
})
