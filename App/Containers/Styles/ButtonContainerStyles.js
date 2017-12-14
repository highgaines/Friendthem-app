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
    borderRadius: 50,
    padding:50,
    backgroundColor: '#4d9900',
    borderColor: 'white',
    borderWidth: 2,
    color: 'white'
  }
})
