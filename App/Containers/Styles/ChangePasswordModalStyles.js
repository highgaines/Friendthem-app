import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  containerModal: {
    width: 300,
    height: 400,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center'
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
  },
  entryContainer: {
    height: 70,
    top: 120,
    zIndex: 99,
    borderTopWidth: 1,
    borderColor: Colors.borderGray,
    width: 300,
    justifyContent: 'center'
  },
  textInput: {
    flex: 1,
    left: 10
  },
  sectionHead: {
    color: Colors.borderGray,
    fontWeight: 'bold',
    top: 10,
    left: 10
  },
  showEye: {
    position: 'absolute',
    right: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    top: 100,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  optionButton: {
    backgroundColor: Colors.buttonBlue,
    width: 120,
    alignSelf: 'center',
    top: 30,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
    marginBottom: 125,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'blue',
    shadowOffset: { height: 3, width: 3 }
  }
})
