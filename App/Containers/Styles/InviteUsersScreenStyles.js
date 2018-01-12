import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerGradient: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  tabSelectionContainer: {
    flexDirection: 'row',
    marginTop: 30
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
    flex: 1
  },
  friendCount: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center'
  }
})
