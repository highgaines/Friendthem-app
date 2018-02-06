import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  feedContainer: {
    height: 366
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  }
})
