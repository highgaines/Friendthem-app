import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  userCardContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#a6acb1',
    padding: 5,
    borderBottomWidth: 1
  },
  imageColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  userNameText: {
    fontFamily: 'montserrat',
    fontSize: 14,
    fontWeight: '600'
  },
  infoColumn: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sendButtonColumn: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  inviteRowContent: {
    height: 45,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
