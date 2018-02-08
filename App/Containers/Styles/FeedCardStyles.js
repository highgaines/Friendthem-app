import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    width: Metrics.screenWidth * 0.95,
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
  bottomRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    fontWeight: '700'
  },
  contentBody: {
    marginTop: 20
  },
  descriptionText: {
    color: Colors.charcoalGray,
    fontSize: 18
  },
  image: {
    marginTop: 10,
    height: Metrics.screenWidth * 0.9,
    width: Metrics.screenWidth * 0.9
  }
})
