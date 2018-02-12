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
      searchMode: false
    }
  }

  renderSearchForm = () => {
    return (
      <TextInput
        style={styles.searchForm}
        onChangeText={input => this.props.handleChange(input)}
        value={this.props.input}
      />
    )
  }

  toggleSearch = () => {
    this.setState({ searchMode: !this.state.searchMode })
  }

  render = () => {
    const { numUsers, navigation, feedView, toggleNearbyFeed } = this.props
    const { searchMode } = this.state
    const pluralUsers = numUsers > 1 ? 'People' : 'Person'

    const backAction =  NavigationActions.back()

    return(
      <LinearGradient
        colors={['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
        style={styles.linearGradient}
      >
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Icon
              name='search'
              type='evilicon'
              size={36}
              color='#FFF'
              onPress={this.toggleSearch}
            />
          </View>
        { searchMode
          ? this.renderSearchForm()
          : <View style={styles.tabContainer}>
              <TouchableOpacity onPress={toggleNearbyFeed} style={feedView ? styles.tabButton : styles.selectedTabButton}>
                <Text style={feedView ? styles.unselectedText: styles.selectedText}> People Nearby </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleNearbyFeed} style={feedView ? styles.selectedTabButton : styles.tabButton}>
                <Text style={feedView ? styles.selectedText: styles.unselectedText}> Nearby Feed </Text>
              </TouchableOpacity>
            </View>
        }
          <View style={styles.backIcon}>
            <Icon
              name='arrow-back'
              type='materialicons'
              size={36}
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
