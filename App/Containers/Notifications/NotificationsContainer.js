import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';

// Components
import Header from './Header';
import Navbar from '../Navbar/Navbar';

// Redux Actions
import NotificationStoreActions from '../../Redux/NotificationStore';
import { fetchNotifications, deleteRowAction } from '../../Redux/NotificationStore';

// Styles
import styles from '../Styles/NotificationStyles';

class NotificationsContainer extends Component {
  constructor(props) {
    super(props)

}

  componentDidMount = () => {
    const { fetchNotifications, accessToken } = this.props
    fetchNotifications(accessToken)
  }

  closeRowItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  deleteRow = (rowMap, rowKey) => {
    this.closeRowItem(rowMap, rowKey)
    this.props.deleteRowAction(rowKey)
  }

  render() {
    return(
      <View>
        <Header title='Notifications' />
        <View style={styles.listContainer}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              Most Recent
            </Text>
          </View>
          <SwipeListView
            useFlatList
            disableLeftSwipe={true}
            data={this.props.notifications}
            renderItem={ (data, rowMap) => (
              <View style={styles.rowFront}>
                <Image
                  style={styles.profileImage}
                  source={{uri: data.item.img}}
                  resizeMode='contain'
                />
                <Text style={styles.userName}> {data.item.name} </Text>
                <Text style={styles.message}>
                  {data.item.message} </Text>
              </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => this.deleteRow(rowMap, data.item.key)}
                  >
                    <Icon
                      name="delete"
                      type="materialicons"
                      color="white"
                    />
                    <Text style={styles.rowBackText}> Delete </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => this.deleteRow(rowMap, data.item.key)}
                    >
                      <Icon
                        name="volume-mute"
                        type="materialcommunityicons"
                        color="white"
                      />
                      <Text style={styles.rowBackText}> Silence </Text>
                    </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={-150}
              />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notificationStore.notifications,
  pushNotifications: state.notificationStore.pushNotifications,
  accessToken: state.authStore.accessToken
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchNotifications, deleteRowAction }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
