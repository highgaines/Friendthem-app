import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 75
  },
  socialAccountContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  noNearbyUsersContainer: {
    alignItems: 'center',
    height: '92%',
    top: Metrics.screenHeight * 0.1,
    width: Metrics.screenWidth,
  },
  boldMainText: {
    alignSelf: 'center',
    fontWeight: '800',
    fontSize: 22
  },
  locationMessage: {
    top: 20
  },
  deepLinkText: {
    fontWeight: 'bold'
  },
  buttonGroup: {
    flexDirection: 'row',
    width: Metrics.screenWidth * 0.9,
    justifyContent: 'space-between',
    top: 45
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  optionButton: {
    backgroundColor: Colors.buttonBlue,
    width: 150,
    alignSelf: 'center',
    top: 30,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: 125,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'blue',
    shadowOffset: { height: 3, width: 3 }
  },
  mainImage: {
    height: 158,
    width: 186,
    alignSelf: 'center'
  },
})
