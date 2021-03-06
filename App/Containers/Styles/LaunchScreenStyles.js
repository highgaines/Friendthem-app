import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

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
    marginTop: 20,
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
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
  },
  button: {
    width: Metrics.screenWidth * 0.63,
    height: 47,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 40,
    backgroundColor: '#030ab0',
    borderRadius: 100,
    justifyContent: 'space-around',
    shadowOpacity: 0.30,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 1 }
  },
  fbButton: {
    backgroundColor: Colors.facebook,
    width: Metrics.screenWidth * 0.63,
    height: 47,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 100,
    justifyContent: 'center',
    shadowOpacity: 0.30,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 1 }
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 3
  }
})
