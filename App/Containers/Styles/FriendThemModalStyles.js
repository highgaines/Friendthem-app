import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  containerModal: {
    width: 300,
    height: 295,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 20
  },
  headerGradient: {
    width: 500,
    height: 500,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: -400,
    borderRadius: 400,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    backgroundColor: 'transparent',
    shadowOffset: { height: 0, width: 0 },
    zIndex: 99,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '800'
  },
  modalBodyText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#818181',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 26,
    marginTop: 115
  },
  modalTextInput: {
    height: 35,
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'gray',
    marginTop: 5,
  },
  modalButton: {
    height: 35,
    width: 125,
    borderRadius: 100,
    backgroundColor: '#030AB0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
})
