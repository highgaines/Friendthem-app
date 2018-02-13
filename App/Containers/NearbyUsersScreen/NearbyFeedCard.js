import React, { Component } from 'react';

// Native
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

// Components
import ImageCircle from '../UtilityComponents/ImageCircle';
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ScrollWheel from '../ProfileScreen/ScrollWheel';
import FeedCard from '../SocialFeed/FeedCard';

// Libraries
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeed } from '../../Redux/SocialFeedStore';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/FeedCardStyles';

class NearbyFeedCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      platform: 'instagram'
    }
  }

  componentDidMount = () => {
    const { fetchFeed, friendData, accessToken } = this.props
    fetchFeed(accessToken, friendData.id, this.state.platform)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { fetchFeed, friendData, accessToken } = this.props
    if (prevState.platform !== this.state.platform) {
      fetchFeed(accessToken, friendData.id, this.state.platform)
    }
  }

  handlePlatformChange = platform => {
    this.setState({ platform: platform })
  }

  renderContent = () => {
    const { feed } = this.props
    return feed.map( feedObj => <FeedCard item={feedObj}/>)
  }

  render = () => {
    const { friendData, loading } = this.props

    return(
      <View style={styles.nearbyFeedCardContainer}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#2aa5c0','#5664bd', '#9011ba', '#b31c85', '#e73436']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
            style={styles.linearGradient}
          >
            <View style={styles.nearbyFeedCardHeader}>
              <View style={{ flex: 1 }}>
                <ImageCircle source={friendData.picture} size={60}/>
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.name}> {`${friendData.first_name} ${friendData.last_name}`} </Text>
                <Text style={styles.hobbies}> Crypto | Gaming | Coding </Text>
                <Text style={styles.location}> New York, NY </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.scrollWheel}>
          <ScrollWheel
            handlePlatformChange={this.handlePlatformChange}
            selected={this.state.platform}
            profilePic={friendData.image}
          />
        </View>
        <View style={{ flex: 1, borderColor: 'black', borderWidth: 1, backgroundColor: 'white' }}>
          <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
            {loading
              ? <View style={styles.loading}>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                  />
                </View>
              : this.renderContent()
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.authStore.accessToken,
    feed: state.socialFeed.feed,
    loading: state.socialFeed.fetching,
    userData: state.userStore.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchFeed }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyFeedCard)
