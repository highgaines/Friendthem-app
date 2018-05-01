import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerGradient: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 40
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
  },
  categorizedFriendListContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  qrCodeContainer: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: Metrics.screenHeight * .042,
    left: Metrics.screenWidth * .5
  },
  qrContainerModal: {
    width: 300,
    height: Metrics.screenHeight * .58,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center'
  },
  qrModalText: {
    textAlign: 'center',
    marginBottom: Metrics.screenHeight * .05
  },
  qrModalButton: {
    width: 120,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#030ab0',
    borderRadius: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: Metrics.screenHeight * .05
  },
  qrButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: Fonts.type.base,
    backgroundColor: 'transparent'
  }
})
