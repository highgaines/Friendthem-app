import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import SocialMediaCard from './SuperConnectScreen/SocialMediaCard';
import SuperConnectBar from './SuperConnectScreen/SuperConnectBar'

import styles from './Styles/UserProfileStyles';

class FriendProfileScreen extends Component {
  render() {
    const { friendInfo, superConnect, navigation } = this.props;

    return (
        <View>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.4, 0.6, 0.8, 1.0]}>
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={() => navigation.navigate('LaunchScreen')}>
                <Text>Return Home</Text>
              </TouchableOpacity>
              <View style={styles.profHeaderTop}>
                <Icon
                 name='phone'
                 type='font-awesome'
                 color='#ffffff'
                 containerStyle={styles.phoneIcon}/>
                <Image
                  style={styles.profileImage}
                  source={{uri: friendInfo.image}} />
                 <Icon
                  name='md-mail'
                  type='ionicon'
                  color='#ffffff'
                  containerStyle={styles.mailIcon}/>
              </View>
              <Text style={styles.profileSubtext}>
              {`${friendInfo.name}`}
              </Text>
            </View>
            </LinearGradient>
            <View style={styles.socialIconSlider}>

            </View>
            <View style={styles.socialAccountContainer}>
              <SocialMediaCard
                platformName='Facebook'
                inverted={true}
                userName={friendInfo.name} />
            </View>
            <View style={styles.superConnectBarContainer}>
              <SuperConnectBar
                superConnect={superConnect}/>
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  friendInfo: state.friendStore.friendData
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfileScreen)
