import React, { Component } from 'react'
import { View, TouchableOpacity, RefreshControl, FlatList } from 'react-native'

// Libraries
import { LazyloadScrollView, LazyloadView } from 'react-native-lazyload-deux'

// Components
import UserCard from './UserCard'
import SocialMediaCard from '../SocialMediaCards/SocialMediaCard'
import NoPeopleNearby from './NoPeopleNearby'

// Styles
import styles from '../Styles/UsersContainerStyles'

// Images
import { Images } from '../../Themes'

// Constants
import { isAndroid, isIOS } from '../../Utils/constants'

export default class UsersContainer extends Component {
  state = {
    refreshing: false
  }

  renderUsers = () => {

    const {
      users,
      navigation,
      isActiveLocation,
      locationPermission,
      viewFriendProfile,
      refreshing,
      onRefresh,
      fetching
    } = this.props

    const styling = {
      justifyContent: 'center',
      alignSelf: 'center',
      paddingBottom: '30%',
      marginHorizontal: '5%'
    }

    const flatListContainer = {
      height: 650
    }

    return(
      <View style={flatListContainer}>
        <FlatList
          contentContainerStyle={styling}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          maxToRenderPerBatch={12}
          data={users}
          removeClippedSubviews={true}
          numColumns={3}
          renderItem={({item, index}) => (
            <UserCard
              key={index}
              picture={item.picture}
              name={item.first_name}
              fbUrl={item.fbUrl}
              setFriendInfo={() => viewFriendProfile(item)}
            />
          )}
        />
      </View>
    )
  }

  checkNearby = () => {
    const { navigation, locationPermission, fetching, isActiveLocation } = this.props

    return (!fetching || users.length) && isActiveLocation && locationPermission
    ? this.renderUsers()
    : <NoPeopleNearby
      locationPermission={locationPermission}
      isActiveLocation={isActiveLocation}
      navigation={navigation}
    />
  }

  render = () => {
    return(
      <View>
        {this.checkNearby()}
      </View>
    )
  }
}
