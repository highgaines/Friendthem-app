import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';

// Libraries
import Pie from 'react-native-pie';
import SvgUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

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

  // will need to finish coding out conditional
  const determineRadialColor = (conPct) => {
      if (conPct === 100) {
        return 'rgba(190,255, 20, 0.6)'
      } else if(conPct > 66) {
        return 'rgba(255, 255, 0, 0.5)'
      } else if(conPct > 33) {
        return 'orange'
      } else {
        return 'rgba(255, 0, 50, 0.5)'
      }
  }

  const determineEmblem = () => {
    return conPct === 100
  }

  const progressColor = determineRadialColor(conPct)

  return (
    <Animatable.View animation="slideInUp">
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}>
        <View style={styles.cardText} animation="slideInUp">
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 13}}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View style={styles.pieContainer} animation="slideInUp">
          <Pie
            radius={45}
            innerRadius={30}
            series={[conPct]}
            colors={[progressColor, 'gray']}
            backgroundColor='#ddd'
          />
          <ImageCircle
            size={75}
            source={image}
            extraStyles={{ position: 'absolute'}}
          />
        </View>
        <View style={styles.percentIndicator} >
          <Image
            height={20}
            width={20}
            source={determineEmblem() ? Images.emblemGreen : Images.emblemColor}
          />
          <Text style={styles.pctText}>
            {conPct}%
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  )
}
