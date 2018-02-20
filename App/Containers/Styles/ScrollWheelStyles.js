import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollContainer: {
    height: 90,
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  platforms: {
    flexDirection: 'row',
    justifyContent: 'center',
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
