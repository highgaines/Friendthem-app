import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  usersContainer: {
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row'
  }
})
