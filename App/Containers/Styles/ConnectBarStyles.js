import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    // flex: 1,
  },
  linearGradient: {
    height: 230,
    paddingHorizontal: 30
  },
  rows: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'column'
  },
  titleRow: {
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 40,
    fontSize: 20
  },
  userRow: {
    alignItems: 'center',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  column: {
    flex: 1
  },
  picAndName: {
    alignItems: 'center'
  },
  friendThemLogo: {
    marginLeft: 30
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
    fontSize: 17,
    fontFamily: Fonts.type.base,
  }
})
