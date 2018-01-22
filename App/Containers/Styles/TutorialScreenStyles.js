import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

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
  modal: {
    width: 250,
    height: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
    marginLeft: 70,
    backgroundColor: 'white',
    borderRadius: 30
  },
  modalText: {
    fontSize: 12,
    fontFamily: 'montserrat',
    textAlign: 'center'
  },
  startButton: {
    justifyContent: 'center',
    textAlign: 'center',
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
  }
})
