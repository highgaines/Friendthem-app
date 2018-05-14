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
    alignSelf: 'center',
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
    marginLeft: 5,
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
  },
  buttonIconStyle: {
    right: 13
  },
  superTextConnectContainer: {
    flex: 1,
    alignSelf: 'center',
    top: Metrics.screenHeight * .4,
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
    backgroundColor: '#19c531',
  },
  superTextConnectIcon: {
    width: 20,
    marginRight: 10
  },
  superTextConnectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800'
  }
})
