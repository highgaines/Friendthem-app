import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardUnselected: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 7,
    height: 120,
    width: '30%',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginHorizontal: 5
  },
  cardSelected: {
    alignItems: 'center',
    backgroundColor: '#3C5996',
    marginTop: 10,
    paddingHorizontal: 7,
    marginHorizontal: 5,
    borderRadius: 10,
    height: 120,
    width: '30%',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginHorizontal: 5
  },
  myPicsCard: {
    height: 120,
    width: '30%',
    borderRadius: 10,
    marginTop: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginHorizontal: 5
  },
  invertedCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 10,
    height: 120,
    width: '30%',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginHorizontal: 5
  },
  socialMediaImage: {
    borderRadius: 50,
    height: 60,
    marginTop: 25,
    width: 100,
    marginBottom: -10
  },
  socialMediaText: {
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  platformName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Fonts.type.base,
  },
  unsyncedPlatformName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#adadad',
    fontFamily: Fonts.type.base,
  },
  userName: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: Fonts.type.base,
  },
  unsyncedUserName: {
    fontSize: 10,
    color: '#adadad',
    fontWeight: 'bold',
    fontFamily: Fonts.type.base,
  },
  platformNameInverted: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: Fonts.type.base,
  },
  userNameInverted: {
    fontSize: 10,
    color: '#000000',
    fontFamily: Fonts.type.base,
  },
  iconContainer: {
    height: 30,
    width: 30
  },
  checkIcon: {
    right: 5,
    top: 3,
    position: 'absolute'
  }
})
