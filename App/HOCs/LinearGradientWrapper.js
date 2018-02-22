import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientWrapper = (Component, customStyles, colors) => props => {
  return(
    <LinearGradient
      colors={
        colors
        ? colors
        : ['#e73436', '#b31c85', '#9011ba', '#5664bd', '#2aa5c0']
      }
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      locations={[0.1, 0.3, 0.5, 0.7, 1.0]}
      style={
        customStyles
        ? customStyles
        : { flex: 1 }
      }
    >
      <Component {...props} />
    </LinearGradient>
  )
}

export default LinearGradientWrapper
