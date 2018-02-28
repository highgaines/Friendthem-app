import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profile: {
    shadowColor: 'black',
    backgroundColor: 'transparent',
    elevation: 3,
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.5,
    zIndex: 1000
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
    shadowOffset: { height: 6, width: 10 },
    zIndex: 99
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
  tabSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  tabText: {
    color: '#a6acb1',
    fontSize: 15,
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  selectedText: {
    color: '#fff'
  },
  selected: {
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
    paddingBottom: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    justifyContent: 'flex-start',
    width: '100%',
    height: 366
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
  },
  cameraIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 60,
    left: 60
  }
})
