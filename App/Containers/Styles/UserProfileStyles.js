import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profile: {
    shadowColor: 'black',
    backgroundColor: 'transparent',
    width: Metrics.screenWidth,
    elevation: 3,
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.5,
    zIndex: 1000,
    paddingTop: 30
  },
  profileHeader: {
    height: 220,
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
  backIcon: {
    alignSelf: 'flex-start',
    position: 'absolute'
  },
  profHeaderTop: {
    height: 125,
    flexDirection: 'row'
  },
  scrollWheelContainer: {
    shadowOpacity: 0.15,
    width: Metrics.screenWidth,
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
    fontSize: 11,
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
  profileHometownText: {
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontFamily: Fonts.type.base,
    marginTop: 5
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
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '120%'
  },
  socialAccountContainerAndroid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%'
  },
  progressBarContainer: {
    width: Metrics.screenWidth,
    marginTop: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  myPicsCard: {
    height: 120,
    width: '30%',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    marginHorizontal: 5
  },
  SuperConnectBarContainer: {
    alignItems: 'center'
  },
  interestsText: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 5,
    paddingHorizontal: 40,
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
  },
  scrollContainer: {
    height: Platform.OS === 'ios' ? Metrics.screenHeight * 0.6 : Metrics.screenHeight * 0.55,
  },
  socialCardScrollContainer: {
    height: '100%',
    width: Metrics.screenWidth,
    paddingBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: Metrics.screenHeight * .025,
    right: Metrics.screenWidth * .05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 7
  }
})
