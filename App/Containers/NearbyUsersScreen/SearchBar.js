import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

// Styles
import styles from '../Styles/SearchBarStyles';

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      searchMode: false
    }
  }

  handleChange = input => {
    this.setState({input: input})
  }

  renderSearchForm = () => {
    return (
      <TextInput
        style={styles.searchForm}
        onChange={input => this.handleChange(input)}
        value={this.state.input}
      />
    )
  }

  toggleSearch = () => {
    this.setState({ searchMode: !this.state.searchMode })
  }

  render = () => {
    const { numUsers, navigation } = this.props
    const { searchMode } = this.state

    const backAction =  NavigationActions.back()

    return(
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.4, 0.6, 0.8, 1.0]}
        style={styles.linearGradient}
      >
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Icon
              name='search'
              type='evilicon'
              color='#FFF'
              onPress={this.toggleSearch}
            />
          </View>
        { searchMode
          ? this.renderSearchForm()
          : <Text style={styles.numUsers}> {numUsers} users nearby </Text>
        }
        <View style={styles.backIcon}>
          <Icon
            name='arrow-back'
            type='materialicons'
            color='#FFF'
            onPress={() => navigation.dispatch(backAction) }
          />
        </View>
        </View>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(SearchBar)
