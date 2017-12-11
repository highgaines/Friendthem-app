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
  primSubText: {
    marginTop:20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
    fontSize: 15
  },
  secSubText: {
    marginTop: 2,
    color: 'white'
  },
  linearGradient: {
    flex: 1
  }
})
