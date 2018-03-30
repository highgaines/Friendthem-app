import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    position: 'absolute',
    bottom: Metrics.screenHeight * .435,
    width: 340,
    height: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#030ab0',
    alignSelf: 'center'
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
