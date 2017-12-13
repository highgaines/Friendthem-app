import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardUnselected: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    height: 130,
    width: 120
  },
  cardSelected: {
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    marginTop: 10,
    borderRadius: 10,
    height: 130,
    width: 120
  },
  socialMediaImage: {
    marginLeft: 30,
    marginBottom:10,
    borderRadius: 50,
    height: 60,
    marginTop: 10,
    width: 100
  },
  socialMediaText: {
    alignItems: 'center',
    marginTop: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  platformName: {
    fontSize: 17,
    fontWeight: 'bold'
  }
})
