import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

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
    marginTop:10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
    fontSize: 20
  },
  secSubText: {
    marginTop: 2,
    color: 'white'
  },
  linearGradient: {
    flex: 1
  }
})
