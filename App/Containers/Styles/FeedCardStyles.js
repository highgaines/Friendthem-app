import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    width: Metrics.screenWidth * 0.9,
    height: 335,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowOffset:{
      width: 0,
      height: 0
    },
    shadowColor: 'black',
    shadowOpacity: 0.5
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 150
  },
  nearbyFeedCardContainer: {
    width: Metrics.screenWidth * .96,
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    marginBottom: 10
  },
  nearbyFeedCardHeader: {
     flexDirection: 'row',
     flex: 4,
     padding: 20,
     backgroundColor: 'transparent',
     elevation: 3,
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5,
     zIndex: 99
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  socialAccountContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  myPicsCard: {
    height: 120,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginRight: 10,
    marginBottom: 10,
  },
  deepLinkButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  deepLinkButton: {
    width: 100,
    height: 30,
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
    fontSize: 10,
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
  header: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.5,
    zIndex: 99
  },
  name: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '800',
    color: 'white',
    marginBottom: 5
  },
  hobbies: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Montserrat',
    color: 'white',
    marginBottom: 5
  },
  location: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Montserrat',
    color: 'white'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 5,
    width: Metrics.screenWidth * 0.9,
    paddingHorizontal: 15
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dateText: {
    fontSize: 11,
    color: 'gray',
    bottom: 2
  },
  likeText: {
    color: Colors.socialMediaBlue,
    fontWeight: '700',
    textAlign: 'right',
    bottom: 5
  },
  contentBody: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  descriptionText: {
    color: Colors.charcoalGray,
    fontSize: 12
  },
  image: {
    height: Metrics.screenWidth * 0.70,
    width: Metrics.screenWidth * 0.85,
    marginBottom: 5
  },
})
