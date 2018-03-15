import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  nearbyUsersContainer: {
    justifyContent: 'center'
  },
  nearbyUsersNavbar: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    marginTop: 610,
    backgroundColor: 'black',
    height: 60,
    flexDirection: 'row'
  }
})
