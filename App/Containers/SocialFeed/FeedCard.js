import React, { Component } from 'react'

// Native
import { Text, View, Linking, TouchableOpacity, Image } from 'react-native'

// Libraries
import { Icon } from 'react-native-elements'

// Images
import { Images } from '../../Themes'

// Styles
import styles from '../Styles/FeedCardStyles'
import convertTime from 'convert-time'

import { LazyloadView } from 'react-native-lazyload-deux'

export default FeedCard = props => {
  const { item } = props
  const dateSplit = new Date(parseInt(item.date_posted) * 1000).toString().split(' ')
  const month = dateSplit[1]
  const day = dateSplit[2]
  const year = dateSplit[3]
  const time = convertTime(dateSplit[4])

  return(
    <LazyloadView style={[styles.cardContainer, !item.img_url ? {'height': 90 } : null]}>
      <LazyloadView style={styles.contentBody}>
        {
          item.img_url
          ? <Image
              source={{ uri: item.img_url }}
              style={styles.image}
              />
          : null
        }
        <LazyloadView style={{ padding: 10 }}>
          <Text numberOfLines={2} style={styles.descriptionText}>
            { item.description }
          </Text>
        </LazyloadView>
        <LazyloadView style={styles.bottomRow}>
          <Text style={styles.dateText}>
            { `${month} ${day} ${year} at ${time}` }
          </Text>
          <Text style={styles.likeText}>
            {`${item.num_likes} likes`}
          </Text>
        </LazyloadView>
      </LazyloadView>
    </LazyloadView>
  )
}
