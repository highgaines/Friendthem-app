import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    width: Metrics.screenWidth * 0.7,
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
    width: Metrics.screenWidth * 0.95,
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
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
    flex: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dateText: {
    fontSize: 11,
    color: 'gray',
    top: 3
  },
  likeText: {
    color: Colors.socialMediaBlue,
    fontWeight: '700',
    textAlign: 'right'
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
    height: Metrics.screenWidth * 0.7,
    width: Metrics.screenWidth * 0.7,
    marginBottom: 5
  }
})
