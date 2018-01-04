import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  socialMediaRowContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'column'
  },
  inputHeader: {
    flexDirection: 'row',
    width: '100%'
  },
  platformText: {
    fontWeight: '800',
    fontSize: 16,
    left: 10,
    marginBottom: 10
  },
  syncText: {
    fontWeight: '800',
    fontSize: 15,
    left: 220
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: -25
  },
  textInputSync: {
    width: 275,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    left: 5,
    paddingHorizontal: 10,
    borderColor: '#7fd324b0',
    borderWidth: 2
  },
  textInputNonSync: {
    width: 275,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    left: 5,
    paddingHorizontal: 10,
    color: '#cacaca'
  },
  syncCheckmark: {
    position: 'absolute',
    left: 250,
    top: 10
  },
  syncImage: {
    marginLeft: 25,
    marginTop: -5
  }
})
