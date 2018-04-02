import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'
import { isIpad } from '../../Utils/constants'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  navbarRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Metrics.screenWidth,
    backgroundColor: 'black',
    height: 60,
    flexDirection: 'row'
  },
  modal: {
    width: 350,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 50,
    marginTop: 280,
    alignSelf: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    zIndex: 99
  },
  button: {
    width: isIpad ? 70 : 80,
  },
  peopleNearbyIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 200
  },
  peopleNearbyIconAndroid: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 200,
    height: 80,
    width: 80,
    top: -15
  },
  selectedScreen: {
    borderColor: '#ff00e1',
    borderBottomWidth: 2
  },
  unselectedScreen: {
    borderColor: 'black',
    borderBottomWidth: 2
  }
})
