import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { Images } from '../../Themes'
import _ from 'lodash'

// Libraries
import { Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

// HOC
import LinearGradientWrapper from '../../HOCs/LinearGradientWrapper'

// Styles
import styles from '../Styles/SearchBarStyles'

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

    return(
        <View style={styles.searchBar}>
          <View style={styles.backIcon}>
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
          <View style={styles.searchIcon}>
            <Icon
              name='search'
              type='evilicon'
              size={36}
              color='#FFF'
              onPress={this.toggleSearch}
            />
          </View>
        </View>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(LinearGradientWrapper(SearchBar, styles.linearGradient))
