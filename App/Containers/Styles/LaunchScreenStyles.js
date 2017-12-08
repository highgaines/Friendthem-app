import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1
  },
  title: {
    marginTop: 100,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.type.base,
  }
})
