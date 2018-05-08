import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import _ from 'lodash'

// Components
import Header from './Header';
import Navbar from '../Navbar/Navbar';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendStoreActions from '../../Redux/FriendStore'
import NotificationStoreActions from '../../Redux/NotificationStore';
import { fetchNotifications, deleteRowAction, deleteNotification } from '../../Redux/NotificationStore';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/NotificationStyles';

class NotificationsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rowOpen: false
    }

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

  handleNotificationPress = friendData => {
    const { setFriendInfo, navigation } = this.props

    setFriendInfo(friendData)
    navigation.navigate('FriendProfileScreen')
  }

  render() {
    const { fetching, notifications } = this.props
    const sortedNotifications = _.orderBy(notifications, ['created_at', 'id'], ['desc', 'desc'])

    if (fetching) {
      return (
        <View style={{ height: '30%', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }

    return(
      <View style={{height: '100%'}}>
        <Header title='Notifications' />
        <View
          style={styles.listContainer}>
          <View
            testID='notification-container'
            style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              Most Recent
            </Text>
          </View>
          <SwipeListView
            useFlatList={true}
            scrollEnabled={!this.state.rowOpen}
            keyExtractor={(item, index) => `${item.id}`}
            previewOpenValue={-150}
            data={notifications ? sortedNotifications : []}
            onRowDidOpen={() => this.setState({ rowOpen: true })}
            onRowDidClose={() => this.setState({ rowOpen: false })}
            closeOnScroll={false}
            renderItem={ (data, rowMap) => (
              <TouchableOpacity
                key={data.id}
                activeOpacity={1}
                onPress={() => this.handleNotificationPress(data.item.sender)} style={styles.rowFront}>
                <Image
                  style={styles.profileImage}
                  source={data.item.sender.picture ? {uri: data.item.sender.picture} : Images.noPicSVG}
                />
                <Text style={styles.userName}>
                  {data.item.sender.first_name}
                </Text>
                <Text style={styles.message} numberOfLines={1}>
                  {`super connected with you! Click to view!`}
                </Text>
              </TouchableOpacity>
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
                previewRowKey={this.props.notifications && this.props.notifications.length ? `${this.props.notifications[0].id}` : '0'}
              />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notificationStore.notifications,
  accessToken: state.authStore.accessToken,
  fetching: state.notificationStore.fetching
})

const mapDispatchToProps = dispatch => {
  const { setFriendInfo } = FriendStoreActions
  return {
    ...bindActionCreators({
      fetchNotifications,
      deleteRowAction,
      deleteNotification,
      setFriendInfo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
