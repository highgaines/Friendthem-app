import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    // flex: 1,
  },
  linearGradient: {
    height: 250
  },
  rows: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'column'
  },
  titleRow: {
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 50,
    fontSize: 30
  },
  userRow: {
    alignItems: 'center',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  column: {
    flex: 1
  },
  picAndName: {
    alignItems: 'center'
  },
  friendThemLogo: {
    marginLeft: 40
  },
  image: {
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    width: 100,
    height: 100,
    margin: 10
  },
  name: {
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 17
  }
})
