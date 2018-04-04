import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'
import { isIpad } from '../../Utils/constants'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollContainerStyle: {
    height: Metrics.screenHeight * (isIpad ? 1.5 : 1.3),
    flex: 1
  },
  userInfoView: {
    height: Metrics.screenHeight * (isIpad ? 1.5 : 1.3),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  friendThemIcon: {
    marginTop: 30
  },
  friendThemLoginIcon: {
    marginTop: isIpad ? 50 : 150,
    marginBottom: 25
  },
  formText: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '800'
  },
  loginFormText: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '800'
  },
  formInput: {
    width: '90%',
    height: 35,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginVertical: 7.5,
    paddingHorizontal: 15
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  checkBoxText: {
    color: '#fff',
    fontWeight: '400',
    marginTop: 5,
    marginLeft: 5
  },
  loginCheckBoxText: {
    color: '#ffffff',
    fontWeight: '400',
    marginTop: 0
  },
  buttonStyle: {
    flexDirection: 'row',
    backgroundColor: '#060aad',
    width: 175,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonStyle: {
    flexDirection: 'row',
    backgroundColor: '#060aad',
    width: 175,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 50,
    marginRight: 25
  },
  footerContainer: {
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'montserrat',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  footerOffset: {
    marginTop: isIpad ? 15 : 30
  }
})
