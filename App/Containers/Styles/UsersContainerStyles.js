import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#f2f2f2',
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5
  },
  socialAccountContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
