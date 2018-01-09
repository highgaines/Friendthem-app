import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listContainer:{
    marginTop: 50
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
    }
})
