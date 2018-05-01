import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  nearbyUsersContainer: {
    justifyContent: 'center',
    paddingBottom: Metrics.screenHeight * .05,
  }
})
