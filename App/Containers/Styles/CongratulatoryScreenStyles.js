import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 3,
    // alignItems: 'center'
  },
  linearGradient: {
    height: 70,
    justifyContent: 'flex-end'
  },
  headerBar: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center'
  },
  superConnectText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    flex: 2,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  button: {
    alignSelf: 'stretch',
    color: 'white'
  },
  imgOverlapContainer: {
    flex: 2,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  image1: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  image2: {
    position: 'absolute',
    left: 100,
    borderRadius: 75,
    width: 150,
    height: 150
  }
})
