import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardUnselected: {
    alignItems: 'center',
    backgroundColor: '#3C5996',
    marginTop: 10,
    borderRadius: 10,
    height: 130,
    width: 120
  },
  cardSelected: {
    alignItems: 'center',
    backgroundColor: '#3C5996',
    marginTop: 10,
    borderRadius: 10,
    height: 130,
    width: 120
  },
  socialMediaImage: {
    borderRadius: 50,
    height: 60,
    marginTop: 25,
    width: 100
  },
  socialMediaText: {
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  platformName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  userName: {
    fontSize: 12,
    color: '#FFFFFF'
  },
  iconContainer: {
    height: 30,
    width: 30
  },
})
