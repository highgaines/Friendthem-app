import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  feedContainer: {
    padding: 10,
    paddingBottom: 100
  },
  nearbyFeedContainer: {
    padding: 10
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
  },
  deepLinkButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  deepLinkButton: {
    marginTop: 20,
    width: 150,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    shadowOpacity: 0.30,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: 10 }
  },
  deepLinkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  facebookDeeplinkButton: {
    backgroundColor: Colors.facebook
  },
  twitterDeeplinkButton: {
    backgroundColor: Colors.twitter
  },
  youtubeDeeplinkButton: {
    backgroundColor: Colors.youtube
  },
  snapchatDeeplinkButton: {
    backgroundColor: Colors.snapchat
  },
  linkedInDeepLinkButton: {
    backgroundColor: Colors.linkedin
  }
})
