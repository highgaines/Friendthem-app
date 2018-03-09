import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bannerView: {
    height: 50,
    width: Metrics.screenWidth - 35,
    marginTop: 7,
    marginLeft: 12,
    marginRight: 12,
    padding: 4,
    borderRadius: 5,
    justifyContent: 'flex-start',
    backgroundColor: '#0005b7',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bannerLogo: {
    marginHorizontal: 10,
    backgroundColor: 'transparent'
  },
  bannerText: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  bannerStrongText: {
    color: '#fff',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  }
})
