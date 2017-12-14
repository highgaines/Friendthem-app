import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import SocialMediaCard from './SuperConnectScreen/SocialMediaCard';

import styles from './Styles/UserProfileStyles';

class UserProfileScreen extends Component {
  render() {
    const { userInfo } = this.props;
    return (
        <View>
          <LinearGradient
          colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.4, 0.6, 0.8, 1.0]}>
            <View style={styles.profileHeader}>
              <View style={styles.profHeaderTop}>
                <Icon
                 name='phone'
                 type='font-awesome'
                 color='#ffffff'
                 containerStyle={styles.phoneIcon}/>
                <Image
                  style={styles.profileImage}
                  source={{uri: `${userInfo.picture.data.url}`}} />
                <Icon
                 name='md-mail'
                 type='ionicon'
                 color='#ffffff'
                 containerStyle={styles.mailIcon}/>
              </View>
              <Text style={styles.profileSubtext}>
              {`${userInfo.name}`}
              </Text>
            </View>
            </LinearGradient>
            <View style={styles.socialIconSlider}>

            </View>
            <View style={styles.socialAccountContainer}>
              <SocialMediaCard
                platformName='Facebook'
                userName={userInfo.name}
                inverted={false} />
            </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userStore.userFbData,
  fbAuthToken: state.fbStore.fbAccessToken
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)
