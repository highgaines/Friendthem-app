import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profileInfoContainer: {

  },
  headerView: {
    marginTop: 25,
    flexDirection: 'row',
    width: '100%'
  },
  headerGradient: {
    width: '100%',
    height: 200
  },
  headerButton: {
    backgroundColor: 'transparent',
    marginHorizontal: 10
  },
  headerButtonText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 17,
  },
  headerImage: {
    height: 115,
    width: 115,
    marginHorizontal: 60,
    alignSelf: 'center',
    borderColor: '#fff',
    borderRadius: 57.5,
    borderWidth: 5
  },
  tabSelectionContainer: {
  },
  tabItem: {
    backgroundColor: 'transparent',
    width: '50%',
    paddingBottom: 10
  },
  tabText: {
    color: '#a6acb1',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  selected: {
    borderBottomColor: '#fff',
    borderBottomWidth: 3
  },
  selectedText: {
    color: '#fff'
  },
  tabDisplay: {
    backgroundColor: 'blue',
    height: 5000
  }
})
