import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  button: {
    width: 220,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    shadowOpacity: 0.50,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 },
    marginTop: 15
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 7,
    fontFamily: Fonts.type.base,
  },
  centered: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  primSubText: {
    marginTop: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
    fontFamily: Fonts.type.base,
  },
  secSubText: {
    color: 'white',
    fontFamily: Fonts.type.base,
    fontSize: 17,
    marginBottom: 15
  },
  linearGradient: {
    flex: 1
  },
  userImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#fff',
    borderWidth: 2,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userImage: {
    width: 90,
    height: 90,
  }
})
