import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profile: {

  },
  profileHeader: {
    height: 210,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'transparent',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 }
  },
  profHeaderTop: {
    height: 125,
    flexDirection: 'row'
  },
  scrollWheelContainer: {
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 },
    zIndex: 100
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  profileSubtext: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontFamily: Fonts.type.base,
  },
  linearGradient: {
    flex: 1
  },
  phoneIcon: {
    height: 40,
    width: 40,
    marginTop: 45,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 20
  },
  mailIcon: {
    height: 40,
    width: 40,
    marginTop: 45,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 20
  },
  socialIconSlider: {
    height: 30,
    backgroundColor: '#143a7a'
  },
  socialAccountContainer: {
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  SuperConnectBarContainer: {
    alignItems: 'center'
  },
  interestsText: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 5,
    fontFamily: Fonts.type.base,
    fontWeight: '600'
  },
  userProfNavbar: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    marginTop: 140,
    backgroundColor: 'black',
    height: 60,
  },
  button: {
    width: 140,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    shadowOpacity: 0.50,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 },
    marginTop: 15
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 3,
    fontFamily: Fonts.type.base,
  }
})
