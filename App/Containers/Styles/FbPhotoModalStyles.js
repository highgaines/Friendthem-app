import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: Metrics.screenHeight * 0.7,
    width: Metrics.screenWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    zIndex: 99,
    height: Metrics.screenHeight * 0.15,
    width: Metrics.screenHeight * 0.15,
    margin: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    margin: 10,
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    width: Metrics.screenWidth * 0.7,
    justifyContent: 'space-between',
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
  },
  noPhotosText: {
    alignSelf: 'center',
    top: Metrics.screenHeight * 0.3
  }
})
