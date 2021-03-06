import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: Metrics.screenHeight - (Metrics.screenHeight * .705),
  },
  friendThemButton: {
    width: 170,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 100,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  superConnectBarContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  superConnectButton: {
    width: 170,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 100,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 7,
    fontFamily: Fonts.type.base,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    width: 130,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center'
  }
})
