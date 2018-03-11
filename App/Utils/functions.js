import { RNS3 } from 'react-native-aws3';
import envConfig from '../../envConfig';
import OneSignal from 'react-native-onesignal';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';

export const uploadToAWS = async (uri, userId, callback, data, token) => {

  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: uri,
    name: `profile-pic-${userId}.jpg`,
    type: "image/jpg"
  }
  const { AWSAccessKeyID, AWSSecretKey } = envConfig.Development

  const options = {
    bucket: "friendthem-staging",
    region: "us-east-1",
    accessKey: `${AWSAccessKeyID}`,
    secretKey: `${AWSSecretKey}`,
    successActionStatus: 201
  }

  await RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");

    let bucketUrl = response.body.postResponse.location
    callback(data, 'picture', bucketUrl, token)

  }).catch( error => console.log(error))
}


export const uploadToAWS2 = async (uri, userId, callback, pictureId, token, primary) => {

  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: uri,
    name: `my-pictures-${userId}-${pictureId}.jpg`,
    type: "image/jpg"
  }
  const { AWSAccessKeyID, AWSSecretKey } = envConfig.Development

  const options = {
    bucket: "friendthem-staging",
    region: "us-east-1",
    accessKey: `${AWSAccessKeyID}`,
    secretKey: `${AWSSecretKey}`,
    successActionStatus: 201
  }

  await RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");

    let bucketUrl = response.body.postResponse.location
    if (primary) {
      callback(token, bucketUrl, pictureId)
    } else {
      callback(token, bucketUrl, pictureId)
    }

  }).catch( error => console.log(error))
}

// For Android only
export const RequestContactsPermission =
  async (
    storeContactInfo,
    customNotificationPermission,
    nativeNotifications
  ) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Access to Contacts',
        'message': 'Friendthem would like access to your contacts so you can manage them all in one place.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll( (err, contacts) => {
        if (err === 'denied') {
          console.log('DENIED')
        } else {
          console.log('SUCCESS')
          storeContactInfo(contacts)
        }
      })
    } else {
      console.log("Contacts permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

export const RequestLocationPermission = async (setLocationInterval) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Access to Location',
        'message': 'Friendthem would like access to your location so you can connect with nearby users.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll( (err, contacts) => {
        if (err === 'denied') {
          console.log('DENIED')
        } else {
          console.log('SUCCESS')
          setLocationInterval()
        }
      })
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
