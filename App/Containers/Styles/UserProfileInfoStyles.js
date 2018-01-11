import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  userInfoView: {
    height: '100%',
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
    marginTop: 50
  },
  friendThemLoginIcon: {
    marginTop: 150,
    marginBottom: 25
  },
  headerText: {
    backgroundColor: 'transparent',
    color: '#fff'
  },
  formText: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 18
  },
  loginFormText: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '800'
  },
  formInput: {
    width: '90%',
    height: 45,
    borderRadius: 50,
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
    marginTop: 10
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
})
