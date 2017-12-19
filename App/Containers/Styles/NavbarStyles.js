import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  navbarRow: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    marginTop: 220,
    backgroundColor: 'black',
    height: 60,
    flexDirection: 'row'
  }
})
