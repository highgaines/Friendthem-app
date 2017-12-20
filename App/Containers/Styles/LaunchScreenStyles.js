import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
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
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  primSubText: {
    marginTop:20,
    fontWeight: '500',
    fontStyle: 'italic',
    color: 'white',
    fontSize: 15,
    fontFamily: Fonts.type.base,
  },
  secSubText: {
    marginTop: 2,
    color: 'white',
    fontFamily: Fonts.type.base,

  },
  linearGradient: {
    flex: 1
  },
  title: {
    marginTop: 100,
    fontSize: 50,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.type.base,
  }
})
