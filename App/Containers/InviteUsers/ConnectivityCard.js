import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';

// Libraries
import Pie from 'react-native-pie';
import SvgUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

// Components
import ImageCircle from '../UtilityComponents/ImageCircle';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FriendStoreActions from '../../Redux/FriendStore';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/UserCardStyles';

class ConnectivityCard extends Component {
  constructor() {
    super()
  }

  handlePress = () => {
    const { setFriendInfo, navigation, friendData } = this.props

    setFriendInfo(friendData)
    navigation.navigate('FriendProfileScreen')
  }

  // will need to finish coding out conditional
  determineRadialColor = (conPct) => {
    const { image, name } = this.props

      if (conPct === 100) {
        return 'rgba(120,255, 20, 0.3)'
      } else if(conPct > 66) {
        return 'rgba(255, 255, 0, 0.5)'
      } else if(conPct > 33) {
        return 'orange'
      } else {
        return 'rgba(255, 0, 50, 0.5)'
      }
  }

  determineEmblem = () => {
    const { conPct } = this.props

    return conPct === 100
  }

  render() {
    const { conPct, friendData } = this.props
    const progressColor = this.determineRadialColor(conPct)

      return (
        <Animatable.View animation="slideInUp">
          <TouchableOpacity
            style={styles.card}
            onPress={this.handlePress}>
            <View style={styles.cardText} animation="slideInUp">
              <Text
                style={{ fontFamily: 'Montserrat', fontSize: 13}}
                numberOfLines={1}>
                {friendData.first_name}
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
                source={`${friendData.picture}`}
                extraStyles={{ position: 'absolute'}}
              />
            </View>
            <View style={styles.percentIndicator} >
              <Image
                height={20}
                width={20}
                source={this.determineEmblem() ? Images.emblemGreen : Images.emblemColor}
              />
              <Text style={styles.pctText}>
                {conPct}%
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  const { setFriendInfo } = FriendStoreActions

    return {
      ...bindActionCreators({
        setFriendInfo
      }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectivityCard)
