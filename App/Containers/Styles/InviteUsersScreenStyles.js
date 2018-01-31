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
    shadowOffset: { height: 0, width: 0 },
    zIndex: 99
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
  },
  modal: {
    width: 310,
    height: 400,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 70,
    marginLeft: 30,
    backgroundColor: 'white',
    borderRadius: 30
  },
  userContainer: {
    // flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 5
  },
  navbar: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    marginTop: 610,
    backgroundColor: 'black',
    height: 60,
    flexDirection: 'row'
  }
})
