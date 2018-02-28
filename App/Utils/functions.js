import { RNS3 } from 'react-native-aws3';
import envConfig from '../../envConfig'

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
