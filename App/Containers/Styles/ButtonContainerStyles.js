import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: 340,
    height: 140,
    marginBottom: 40,
    marginLeft: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#004d99'
  },
  button: {
    width: 130,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 5,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 },
    marginTop: 15,
    justifyContent: 'center'
  },
  textStyle: {
    color: '#fff',
    marginLeft: 2,
    backgroundColor: 'transparent',
    fontFamily: Fonts.type.base,
  }
})
