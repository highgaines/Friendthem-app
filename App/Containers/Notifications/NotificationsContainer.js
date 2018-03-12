import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, ListView } from 'react-native';

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

// Components
import Header from './Header';
import Navbar from '../Navbar/Navbar';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationStoreActions from '../../Redux/NotificationStore';
import { fetchNotifications, deleteRowAction, deleteNotification } from '../../Redux/NotificationStore';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/NotificationStyles';

class NotificationsContainer extends Component {
  constructor(props) {
    super(props)

}

  componentWillMount = () => {
    const { fetchNotifications, accessToken } = this.props
    fetchNotifications(accessToken)
  }

  closeRowItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  triggerDeleteAction = data => {
    const { deleteNotification, accessToken, fetchNotifications } = this.props
    const { id } = data.item
    deleteNotification(accessToken, id).then( () => fetchNotifications(accessToken) )
  }

  render() {
    return(
      <View>
        <Header title='Notifications' />
        <View style={styles.listContainer}>
          <View
            testID='notification-container'
            style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              Most Recent
            </Text>
          </View>
          <SwipeListView
            useFlatList
            data={this.props.notifications ? this.props.notifications : []}
            renderItem={ (data, rowMap) => (
              <View style={styles.rowFront}>
                <Image
                  style={styles.profileImage}
                  source={data.item.sender.picture ? {uri: data.item.sender.picture} : Images.noPicSVG}
                />
                <Text style={styles.userName}>
                  {data.item.sender.first_name}
                </Text>
                <Text style={styles.message}>
                  {`would like to super connect with you!`}
                </Text>
              </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => this.triggerDeleteAction(data)}
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
                    onPress={() => console.log('silenced')}
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
                rightOpenValue={-150}
              />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notificationStore.notifications,
  accessToken: state.authStore.accessToken
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchNotifications, deleteRowAction, deleteNotification }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
