import { StyleSheet } from 'react-native'
import { Metrix, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  linearGradient: {
    height: 90,
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    zIndex: 99
  },
  header: {
    backgroundColor: 'transparent',
    marginTop: 30,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerTitle: {
    width: '100%',
    height: '50%',
    backgroundColor: 'transparent',
    color: 'white',
    justifyContent: 'center',
    fontSize: 20,
    paddingTop: 30,
    fontFamily: 'Montserrat',
    flex: 3,
    textAlign: 'center'
  }
})
