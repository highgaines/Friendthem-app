import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  linearGradient: {
    height: 80,
    alignItems: 'flex-end'
  },
  searchBar: {
    backgroundColor: 'transparent',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center'
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
    width: '100%',
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.type.base,
    flex: 3,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Montserrat'
  },
  backIcon: {
    alignItems: 'flex-end'
  }
})
