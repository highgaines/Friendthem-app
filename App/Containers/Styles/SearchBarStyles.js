import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  linearGradient: {
    height: 50
  },
  searchBar: {
    backgroundColor: 'transparent',
    marginTop: 20,
    flexDirection: 'row'
  },
  searchIcon: {
    alignItems: 'flex-start',
    width: 130
  },
  numUsers: {
    color: 'white',
    fontSize: 20,
    flex: 3
  },
  backIcon: {
    alignItems: 'flex-end'
  }
})
