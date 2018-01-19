import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollContainer: {
    height: 90,
    backgroundColor: 'white'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  platforms: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
