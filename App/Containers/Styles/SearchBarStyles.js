import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  linearGradient: {
    height: 90,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingBottom: 25,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  searchBar: {
    backgroundColor: 'transparent',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchIcon: {
    alignItems: 'flex-start'
  },
  searchForm: {
    height: 35,
    width: 200,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 10,
    color: 'white'
  },
  numUsers: {
    width: '100%',
    color: 'white',
    fontSize: 20,
    flex: 3,
    textAlign: 'center',
    fontFamily: 'Montserrat'
  },
  backIcon: {
    alignItems: 'flex-end'
  }
})
