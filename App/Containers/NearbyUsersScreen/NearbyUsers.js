import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'

// Components
import SearchBar from './SearchBar';
import UsersContainer from './UsersContainer';
import NearbyFeedContainer from './NearbyFeedContainer';

// Libraries
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

// Components
import Navbar from '../Navbar/Navbar';
import WelcomeScreen from '../TutorialScreens/WelcomeScreen';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendStoreActions from '../../Redux/FriendStore';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/NearbyUsersScreenStyles';

class NearbyUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      welcomeTutorialVisible: true,
      feedView: false
    }
  }

  handleChange = input => {
    this.setState({input: input})
  }

  toggleWelcomeTutorial = () => {
    this.setState({
      welcomeTutorialVisible: false
    })
  }

  toggleNearbyFeed = () => {
    this.setState({ feedView: !this.state.feedView})
  }

  filterUsers = users => {
    const { input } = this.state
    return users.filter( user => user.name.includes(input) )
  }

  render() {
    const { users, navigation, setFriendInfo } = this.props
    const { input, welcomeTutorialVisible, feedView } = this.state

    return(
      <View style={[styles.nearbyUsersContainer]}>
        <SearchBar
          numUsers={users.length}
          navigation={navigation}
          handleChange={this.handleChange}
          input={this.state.input}
          feedView={feedView}
          toggleNearbyFeed={this.toggleNearbyFeed}
        />
        {
          !feedView
          ? <UsersContainer
              users={input.length ? this.filterUsers(users) : users}
              navigation={navigation}
              setFriendInfo={setFriendInfo}/>
          : <NearbyFeedContainer />
        }
        {
          welcomeTutorialVisible
          ? <WelcomeScreen
              visible={welcomeTutorialVisible}
              closeModal={this.toggleWelcomeTutorial}
              name='Peter Parker'
            />
          : null
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  users: state.friendStore.users
})

const mapDispatchToProps = dispatch => {
  const { setFriendInfo } = FriendStoreActions

  return {
    ...bindActionCreators({ setFriendInfo }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyUsers)
