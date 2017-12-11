import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  usersContainer: {
    backgroundColor: '#f2f2f2',
    flex: 4,
    flexDirection: 'row'
  }
})
