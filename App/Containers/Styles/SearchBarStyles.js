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
    alignItems: 'flex-start'
  },
  searchForm: {
    height: 25,
    width: 200,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    marginLeft: 65,
    marginRight: 65,
    paddingLeft: 10,
    color: 'white'
  },
  numUsers: {
    color: 'white',
    fontSize: 20,
    flex: 3,
    marginLeft: 100
  },
  backIcon: {
    alignItems: 'flex-end'
  }
})
