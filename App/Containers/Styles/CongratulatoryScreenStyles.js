import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'
import { ifIphoneX } from '../../Themes/Helpers'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: ifIphoneX({
    alignItems: 'center',
    marginTop: 35,
    height: Metrics.screenHeight
  }, {alignItems: 'center', marginTop: 25, height: Metrics.screenHeight}),
  linearGradient: {
    height: 70,
    justifyContent: 'flex-end'
  },
  headerBar: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start'
  },
  row: {
    flex: 6,
    flexDirection: 'row',
    marginBottom: 20
  },
  textContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 100
  },
  superConnectText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: Fonts.type.base,
  },
  body: {
    flex: 2,
    padding: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  message: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMessage: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    textAlign: 'center'
  },
  okButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  imgOverlapContainer: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  image1: {
    borderRadius: 75,
    borderWidth: 1,
    width: 150,
    height: 150,
  },
  image2: {
    position: 'absolute',
    zIndex: 0,
    left: 100,
    borderWidth: 1,
    borderRadius: 75,
    width: 150,
    height: 150
  },
  linearGradientBackground: {
    position: 'absolute',
    top: -12,
    left: 88,
    width: 175,
    height: 175,
    opacity: .5,
    borderRadius: 175/2
  },
  linearGradientBackground2: {
    position: 'absolute',
    zIndex: 1,
    top: -12,
    left: -12,
    width: 175,
    height: 175,
    opacity: .5,
    borderRadius: 175/2
  },
  linearGradientBackground3: {
    position: 'absolute',
    top: -25,
    left: 75,
    width: 200,
    height: 200,
    opacity: .5,
    borderRadius: 100
  },
  linearGradientBackground4: {
    position: 'absolute',
    top: -25,
    left: -25,
    width: 200,
    height: 200,
    opacity: .5,
    borderRadius: 100
  },
  subTextContainer: {
    height: 150,
    alignItems: 'center',
    paddingLeft: 20
  },
  superConnectSubtext: {
    fontSize: 16,
    color: '#8F8F8F',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 25
  },
  snapChatConnectButton: {
    width: 200,
    height: 50,
    borderRadius: 75,
    backgroundColor: '#feec01',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snapchatButtonText: {
    marginRight: 10
  },
  snapchatLogo: {
    width: 35,
    height: 35,
    marginLeft: 55
  }
})
