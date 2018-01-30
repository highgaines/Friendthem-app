import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../../Themes';

import SearchBar from './SearchBar';
import UsersContainer from './UsersContainer';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

// Components
import Navbar from '../Navbar/Navbar';
import WelcomeScreen from '../TutorialScreens/WelcomeScreen';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendStoreActions from '../../Redux/FriendStore';

// Styles
import styles from '../Styles/NearbyUsersScreenStyles';

class NearbyUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      welcomeTutorialVisible: true
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

  filterUsers = users => {
    const { input } = this.state
    return users.filter( user => user.name.includes(input) )
  }

  render() {
    const { users, navigation, setFriendInfo } = this.props
    const { input, welcomeTutorialVisible } = this.state

    return(
      <View style={[styles.nearbyUsersContainer]}>
        <SearchBar
          numUsers={users.length}
          navigation={navigation}
          handleChange={this.handleChange}
          input={this.state.input}
        />
        <UsersContainer
          users={input.length ? this.filterUsers(users) : users}
          navigation={navigation}
          setFriendInfo={setFriendInfo}/>
        <Navbar
          navbarStyle={styles.nearbyUsersNavbar}
          current='Nearby'
          navigation={navigation}
          margin={607}
        />
        {welcomeTutorialVisible ? <WelcomeScreen
          visible={welcomeTutorialVisible}
          closeModal={this.toggleWelcomeTutorial}
          name='Peter Parker'
        /> : null }
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
