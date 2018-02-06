import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  feedContainer: {
    height: 500,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  }
})
