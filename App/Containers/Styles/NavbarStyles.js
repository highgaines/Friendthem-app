import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  navbarRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
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
    marginLeft: 15
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center'
  },
  button: {
    width: 70
  }
})
