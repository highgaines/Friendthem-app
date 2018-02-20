import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  personalInfoContainer: {
    backgroundColor: '#f5f8f8',
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: 70,
    justifyContent: 'flex-start',
    padding: 20,
    alignItems: 'center',
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 2,
    backgroundColor: '#f5f8f8'
  },
  rowLabelText: {
    fontWeight: '800',
    marginRight: 10,
    fontSize: 13
  },
  rowTextContent: {
    fontWeight: '700',
    fontSize: 13,
    color: '#9ca4ab',
    marginRight: 10
  },
  form: {
    height: 25,
    paddingVertical: 2,
    paddingHorizontal: 5,
    width: 150,
    fontSize: 13,
    color: 'black',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30
  },
  switchStyle: {
    position: 'absolute',
    right: 65
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 25
  },
  privateRowDivider: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 2,
  },
  mainPrivateText: {
    color: '#bdc1c4',
    fontSize: 14,
    fontWeight: '900',
    left: 0
  },
  subPrivateText: {
    color: '#f6385e',
    fontWeight: '800',
    left: 100
  },
  privateIcon: {
    position: 'absolute',
    right: 10,
    marginTop: 4
  }
})
