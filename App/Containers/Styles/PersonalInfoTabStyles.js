import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  personalInfoContainer: {
    height: 400,
    backgroundColor: '#f5f8f8'
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 2,
    paddingVertical: 25,
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
    color: '#9ca4ab'
  },
  switchStyle: {
    left: 90
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  privateRowDivider: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingVertical: 25,
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
    marginRight: 110,
    marginTop: 20
  }
})
