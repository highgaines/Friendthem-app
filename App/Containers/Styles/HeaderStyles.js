import { StyleSheet } from 'react-native'
import { Metrix, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  linearGradient: {
    height: 80,
    alignItems: 'flex-end',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  header: {
    backgroundColor: 'transparent',
    marginTop: 50,
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
    textAlign: 'center',
    fontWeight: '600'
  }
})
