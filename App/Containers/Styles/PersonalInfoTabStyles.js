import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  personalInfoContainer: {
    height: 500
  },
  rowContainer: {
    flexDirection: 'row'
  },
  rowLabelText: {
    fontWeight: '700'
  }
})
