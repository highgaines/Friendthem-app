import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  card: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 140,
    marginTop: 5,
    borderRadius: 10,
    width: Metrics.screenWidth * 0.3,
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
  },
  percentIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pctText: {
    textAlign: 'center'
  },
  pieContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
