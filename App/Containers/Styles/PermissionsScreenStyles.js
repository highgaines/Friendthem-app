import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontFamily: 'montserrat',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 120,
    height: 40,
    marginHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 40,
    justifyContent: 'center',
    shadowOpacity: 0.50,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 }
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 3,
    fontFamily: Fonts.type.base,
  }
})
