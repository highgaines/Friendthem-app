import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollContainer: {
    height: 90,
    backgroundColor: 'transparent'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  platforms: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11
  },
  linearGradient: {
    height: 90
  }
})
