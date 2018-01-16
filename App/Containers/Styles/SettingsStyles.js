import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: Metrics.screenHeight
  },
  linearGradient: {
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOffset: { height: 5, width: 0 },
    zIndex: 99
  },
  topHeader: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 15
  },
  userProfNavbar: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'black',
    height: 60,
    bottom: 0
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat',
    backgroundColor: 'transparent'
  },
  sectionTitle: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderGray
  },
  sectionItem: {
    height: 60,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray
  },
  sectionItemText: {
    color: Colors.charcoalGray,
    opacity: 0.8,
    fontWeight: '500',
    marginLeft: 15,
    fontSize: 15
  },
  sectionTitleText: {
    color: Colors.medGray,
    opacity: 0.8,
    fontSize: 16
  },
  rightArrow: {
    position: 'absolute',
    right: 15
  }
})
