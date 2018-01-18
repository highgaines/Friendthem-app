import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listContainer:{

  },
  navbar: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    marginTop: 610,
    backgroundColor: 'black',
    height: 60,
    flexDirection: 'row'
  },
  rowFront: {
  		alignItems: 'center',
  		backgroundColor: '#f2f2f2',
  		borderTopColor: 'black',
      borderTopWidth: 1,
      flex: 1,
      flexDirection: 'row',
  		justifyContent: 'flex-start',
  		height: 80,
  	},
  	rowBack: {
  		alignItems: 'center',
  		backgroundColor: '#f2f2f2',
  		flex: 1,
  		flexDirection: 'row',
  		justifyContent: 'space-between',
  		paddingLeft: 15,
  	},
    rowBackText: {
      color: 'white'
    },
    backRightBtn: {
      alignItems: 'center',
		  bottom: 0,
		  justifyContent: 'center',
		  position: 'absolute',
		  top: 0,
		  width: 75
    },
    backRightBtnLeft: {
      backgroundColor: 'red',
		  right: 75
    },
    backRightBtnRight: {
      backgroundColor: 'blue',
      right: 0
    },
    profileImage: {
      width: 75,
      height: 75,
      borderRadius: 75/2,
      borderWidth: 1,
      borderColor: '#f2f2f2'
    },
    message: {
      fontSize: 11
    },
    userName: {
      fontWeight: '800',
      marginRight: 15
    },
    sectionTitle: {
      height: 60,
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingLeft: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.borderGray
    },
    sectionTitleText: {
      color: Colors.medGray,
      opacity: 0.8,
      fontSize: 16
    }
})
