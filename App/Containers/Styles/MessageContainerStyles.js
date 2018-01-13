import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#fff',
    height: 200,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
