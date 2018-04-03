import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    width: '100%',
    height: '100%'
  },
  button: {
    width: 120,
    height: 30,
    flexDirection: 'row',
    backgroundColor: Colors.buttonBlue,
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    shadowOpacity: 0.50,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 6, width: 10 }
  },
  buttonTextStyle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.type.base,
  },
  modal: {
    width: 250,
    height: 250,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    padding: 20
  },
  modalText: {
    fontSize: 10,
    fontFamily: 'montserrat',
    textAlign: 'center'
  },
  startButton: {
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    width: 100,
    height: 40,
    marginVertical: 10,
    borderRadius: 60
  },
  text: {
    color: 'white',
    fontFamily: 'montserrat',
    fontWeight: '700',
    marginVertical: 10
  },
  tutorialContainer: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth
  },
  tutorialBackgroundImage: {
    height: '100%',
    width: '100%'
  }
})
