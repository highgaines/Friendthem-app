import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerGradient: {
    width: 500,
    height: 500,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: -350,
    borderRadius: 500,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    backgroundColor: 'transparent',
    shadowOffset: { height: 0, width: 0 },
    zIndex: 99,
  },
  header: {
    width: '100%',
    height: 60,
    marginTop: 160,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  headerText: {
    fontFamily: "montserrat",
    fontSize: 10,
  },
  imageTextContainer: {
    width: 150,
    alignItems: 'center'
  },
  imageText: {
    color: 'white',
    fontFamily: 'montserrat',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600'
  },
  blueRadial: {
    width: '100%',
    height: 160,
    backgroundColor: '#071aad',
    padding: 5,
    position: 'absolute',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  requestsContainer: {
    width: '100%',
    height: 100,
    padding: 10
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 120,
    height: 40,
    margin: 10,
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
