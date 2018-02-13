import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  feedContainer: {
    padding: 10,
    alignItems: 'center',
    paddingBottom: 100
  },
  nearbyFeedContainer: {
    padding: 10,

  }
})
