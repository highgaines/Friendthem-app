import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';

// Components
import Header from './Header';

// Styles
import styles from '../Styles/NotificationStyles';

export default class NotificationsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //dummy data
      listViewData: [
        {
          key: 1,
          name: "Mickey Mouse",
          img: 'https://www.disneyclips.com/imagesnewb/images/mickey_smiling2.gif',
          message: "wants to connect on facebook"
        },
        {
          key: 2,
          name: "Donald Duck",
          img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Donald_Duck.svg/618px-Donald_Duck.svg.png',
          message: "just joined Friendthem"
         },
        {
          key: 3, name: "Goofy", img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Goofy.svg/1200px-Goofy.svg.png',
          message: "wants to connect on facebook"
        },
        {
          key: 4,
          name: "Sora",
          img: 'https://vignette.wikia.nocookie.net/kingdomhearts/images/5/59/Sora_%28Art%29_KH.png/revision/latest/scale-to-width-down/180?cb=20121114141242',
          message: "wants to follow you"
        }
      ]
    }
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  deleteRow = (rowMap, rowKey) => {
    this.closeRow(rowMap, rowKey)
    const newData = [...this.state.listViewData];
    const prevIdx = this.state.listViewData.findIndex(item => item.key === rowKey)

    newData.splice(prevIdx, 1);
    this.setState({ listViewData: newData })
  }

  render() {
    return(
      <View>
        <Header title='Notifications' />
        <View style={styles.listContainer}>
          <SwipeListView
            useFlatList
            disableLeftSwipe={true}
            data={this.state.listViewData}
            renderItem={ (data, rowMap) => (
              <View style={styles.rowFront}>
                <Image
                  style={styles.profileImage}
                  source={{uri: data.item.img}}
                  resizeMode='contain'
                />
                <Text style={{fontWeight: '800', marginRight: 15}}> {data.item.name} </Text>
                <Text style={styles.message}>
                  {data.item.message} </Text>
              </View>
            )}
            renderHiddenItem={ (data, secId, rowId, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={this.deleteRow}
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
                    onPress={this.deleteRow}
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
