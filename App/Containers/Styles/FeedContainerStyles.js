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
  },
  profileLinkButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    height: 25,
    width: 150,
    borderRadius: 52.5,
    backgroundColor: 'gray',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff'
  },
  titleText: {
    alignSelf: 'flex-start'
  }
})
