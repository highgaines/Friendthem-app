import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profile: {

  },
  profileHeader: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    marginTop: 30
  },
  profHeaderTop: {
    height: 125,
    flexDirection: 'row'
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
  modal: {
    width: 350,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 50,
    marginTop: 280,
    marginLeft: 15
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  }
})
