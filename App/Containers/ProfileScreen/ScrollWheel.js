import React, { Component } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';

// Components
import SMPlatformCircle from '../UtilityComponents/SMPlatformCircle';
import ImageCircle from '../UtilityComponents/ImageCircle';

// HOC
import LinearGradientWrapper from '../../HOCs/LinearGradientWrapper';

// Images
import { Images } from '../../Themes';

// Styles
import styles from '../Styles/ScrollWheelStyles';

class ScrollWheel extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { handlePlatformChange, handleBackToProfile, selected, profilePic, socialPlatforms } = this.props

    return (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.container}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.platforms}>
              <TouchableOpacity onPress={() => handleBackToProfile()}>
                <SMPlatformCircle platform="profile" size={50}/>
                <Text style={selected === 'profile' ? [styles.text, { color: 'white'}] : styles.text}> Profile </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 5 }} onPress={() => handlePlatformChange('camera')}>
                <SMPlatformCircle platform="camera" size={50}/>
                <Text style={selected === 'camera' ? [styles.text, { color: 'white'}] : styles.text}> My Pictures </Text>
              </TouchableOpacity>
              {
                socialPlatforms && socialPlatforms.includes('facebook')
                ? <TouchableOpacity onPress={() => handlePlatformChange('facebook')}>
                  <SMPlatformCircle platform="facebook" size={70}/>
                  <Text style={selected === 'facebook' ? [styles.text, { color: 'white'}] : styles.text}> Facebook </Text>
                </TouchableOpacity>
                : null
              }
              {
                socialPlatforms && socialPlatforms.includes('twitter')
                ? <TouchableOpacity onPress={() => handlePlatformChange('twitter')}>
                  <SMPlatformCircle platform="twitter" size={70}/>
                  <Text style={selected === 'twitter' ? [styles.text, { color: 'white'}] : styles.text}> Twitter </Text>
                </TouchableOpacity>
                : null
              }
              {
                socialPlatforms && socialPlatforms.includes('instagram')
                ? <TouchableOpacity onPress={() => handlePlatformChange('instagram')}>
                  <SMPlatformCircle platform="instagram" size={70}/>
                  <Text style={selected === 'instagram' ? [styles.text, { color: 'white'}] : styles.text}> Instagram </Text>
                </TouchableOpacity>
                : null
              }
              {
                socialPlatforms && socialPlatforms.includes('google-oauth2')
                ? <TouchableOpacity onPress={() => handlePlatformChange('youtube')}>
                  <SMPlatformCircle platform="youtube" size={52}/>
                  <Text style={selected === 'youtube' ? [styles.text, { color: 'white'}] : styles.text}> Youtube </Text>
                </TouchableOpacity>
                : null
              }
              {
                socialPlatforms && socialPlatforms.includes('snapchat')
                ? <TouchableOpacity onPress={() => handlePlatformChange('snapchat')}>
                  <SMPlatformCircle platform="snapchat" size={52}/>
                  <Text style={selected === 'snapchat' ? [styles.text, { color: 'white'}] : styles.text}> Snapchat </Text>
                </TouchableOpacity>
                : null
              }
              {
                socialPlatforms && socialPlatforms.includes('linkedin-oauth2')
                ? <TouchableOpacity onPress={() => handlePlatformChange('linkedin')}>
                  <SMPlatformCircle platform="linkedin" size={72}/>
                  <Text style={selected === 'linkedin' ? [styles.text, { color: 'white'}] : styles.text}> LinkedIn </Text>
                </TouchableOpacity>
                : null
              }
            </View>
          </ScrollView>
    )
  }
}

const colors = ['#2aa5c0','#5664bd', '#9011ba', '#b31c85', '#e73436']

export default LinearGradientWrapper(ScrollWheel, styles.linearGradient, colors)
