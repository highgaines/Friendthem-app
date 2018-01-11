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
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
