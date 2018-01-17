import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  userCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#a6acb1',
    borderTopWidth: 1,
    padding: 10,
    borderBottomWidth: 1
  },
  imageColumn: {
    justifyContent: 'center'
  },
  userNameText: {
    fontFamily: 'montserrat',
    fontSize: 12,
    fontWeight: '600'
  },
  infoColumn: {
    flexDirection: 'column'
  },
  sendButtonColumn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
