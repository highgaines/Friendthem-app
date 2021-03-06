import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  linearGradient: {
    height: 100,
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  searchIcon: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  searchForm: {
    height: 35,
    width: 200,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 20,
    borderRadius: 50,
    paddingLeft: 10,
    color: 'white'
  },
  searchFormDark: {
    backgroundColor: 'transparent',
    height: 35,
    width: '90%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%',
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black'
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
  },
  tabContainer: {
    height: 40,
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
    backgroundColor: Colors.friendThemBlue,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: 0 }
  },
  selectedTabButton: {
    flexDirection: 'row',
    width: 120,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    borderRadius: 50
  },
  tabButton: {
    backgroundColor: 'transparent',
    borderRadius: 30
  },
  selectedText: {
    color: Colors.friendThemBlue,
    textAlign: 'center'
  },
  unselectedText: {
    color: Colors.snow,
    textAlign: 'left'
  }
})
