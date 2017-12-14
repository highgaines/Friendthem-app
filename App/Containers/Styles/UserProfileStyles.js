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
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ffffff'
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
    backgroundColor: '#23e458'
  },
  socialAccountContainer: {
    padding: 2
  }
})
