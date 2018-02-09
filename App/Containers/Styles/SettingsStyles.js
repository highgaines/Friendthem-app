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
  containerModal: {
    width: Metrics.screenWidth *.9,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20
  },
  backArrow: {
    position: 'absolute',
    left: 20,
    alignSelf: 'center'
  },
  topHeader: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
    paddingTop: 16,
    flexDirection: 'row'
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
  },
  scrollView: {
    backgroundColor: 'white',
    height: Metrics.screenHeight * 1.2
  },
  logOutButton: {
    backgroundColor: 'blue',
    width: 150,
    alignSelf: 'center',
    top: 30,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: 125,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'blue',
    shadowOffset: { height: 3, width: 3 },
  },
  logOutText: {
    color: 'white',
    marginLeft: 10
  },
  switchStyle: {
    left: 110
  },
  ghostSwitchStyle: {
    left: 170
  }
})
