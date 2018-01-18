import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  userCardContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#a6acb1',
    padding: 10,
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
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sendButtonColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
