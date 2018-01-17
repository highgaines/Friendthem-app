import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  footerContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#fff',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'montserrat',
    textAlign: 'center',
    letterSpacing: 1,
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})