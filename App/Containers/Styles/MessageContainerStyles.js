import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  firstRowText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'montserrat',
    flexWrap: 'wrap'
  },
  thirdRow: {
    borderTopWidth: 1,
    width: 320,
    padding: 10,
    borderColor: '#edeeef',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cancelContainer: {

  },
  button: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    shadowOpacity: 0.30,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 }
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 3
  }
})
