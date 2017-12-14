import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: 300,
    height: 120,
    marginBottom: 40,
    marginLeft: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#004d99'
  },
  button: {
    flex:1,
    padding:50,
    color: '#004d99',
    backgroundColor: 'white',
    borderRadius: 20
  }
})
