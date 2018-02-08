import React, { Component } from 'react'

// Native
import { Text, View, Linking, TouchableOpacity, Image } from 'react-native'

// Libraries
import { Icon } from 'react-native-elements'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/FeedCardStyles'

export default FeedCard = props => {
  const { item } = props
  const displayName = item.provider === 'instagram'
    ? item.handle
    : item.name
  return(
    <View style={styles.cardContainer}>
          <Text style={styles.displayName}>
            {displayName}
          </Text>
      <View style={styles.contentBody}>
        <Text style={styles.descriptionText}>
          { item.description }
        </Text>
        {
          item.img_url
          ? <Image
              source={{ uri: item.img_url }}
              style={styles.image}
              />
          : null
        }
        <View style={styles.bottomRow}>
          <Text style={styles.dateText}>
            { item.date_posted }
          </Text>
          <Text style={styles.likeText}>
            {`${item.num_likes} likes`}
          </Text>
        </View>
      </View>
    </View>
  )
}
