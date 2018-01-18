import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

// Libraries
import Pie from 'react-native-pie';
import SvgUri from 'react-native-svg-uri';

// Components
import ImageCircle from '../UtilityComponents/ImageCircle';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserCardStyles';

export default ConnectivityCard = props => {
  const { image, name, conPct } = props

  const handlePress = () => {
    //action here
  }

  const determineRadialColor = () => {
      switch(conPct) {
        case conPct === 100:
          return 'green'
      }
  }

  const determineEmblem = () => {
    return conPct === 100
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}>
      <View style={styles.cardText}>
        <Text
          style={{ fontFamily: 'Montserrat', fontSize: 13}}
          numberOfLines={1}>
            {name}
        </Text>
      </View>
      <View style={styles.pieContainer}>
        <Pie
          radius={45}
          innerRadius={30}
          series={[conPct]}
          colors={['green', 'gray']}
          backgroundColor='#ddd'
        />
        <ImageCircle
          size={75}
          source={image}
          extraStyles={{ position: 'absolute'}}
        />
      </View>
        <View style={styles.percentIndicator}>
          <Image
            source={determineEmblem() ? Images.emblemGreen : Images.emblemColor}
          />
          <Text style={styles.pctText}>
            {conPct}%
          </Text>
        </View>
    </TouchableOpacity>
  )
}
