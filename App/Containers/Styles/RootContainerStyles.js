import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  offlineModal: {
    alignItems: 'center',
  },
  modalView: {
    width: Metrics.screenWidth * .95,
    height: Metrics.screenHeight * .15,
    position: 'absolute',
    top: 30,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  modalText: {
    padding: '3%',
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 16
  }
})
