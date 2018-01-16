import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#fff',
    height: 240,
    padding: 30,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    height: 47,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 100,
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
