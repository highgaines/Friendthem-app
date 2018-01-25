import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import { LoginScreen } from '../LoginScreen';

test( 'LoginScreen view renders correctly', () => {
  const tree = renderer.create(
    <LoginScreen
      navigation={() => alert('hit')}/>
  ).toJSON()

  expect( tree ).toMatchSnapshot();
} );

// test( 'InfoHeader view renders with valid props', () => {
//   const tree = renderer.create(
//     <InfoHeader
//       title='Select Project'
//       rightBtnText=''
//       hideRightBtn
//       showLeftBtn
//       leftBtn='Cancel'
//       handleClose={() => {}}
//     />
//   ).toJSON()
//
//   expect( tree ).toMatchSnapshot();
// } );
//
// test( 'InfoHeader view renders without left and right buttons', () => {
//   const tree = renderer.create(
//     <InfoHeader
//       hideRightBtn
//       showLeftBtn={false}
//     />
//   ).toJSON()
//
//   expect( tree ).toMatchSnapshot();
// } );
//
// test( 'InfoHeader renders with close icon', () => {
//   const tree = renderer.create(
//     <InfoHeader
//       showLeftBtn
//       leftBtn="Close icon"
//     />
//   ).toJSON()
//
//   expect( tree ).toMatchSnapshot();
// } );
