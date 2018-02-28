import { RNS3 } from 'react-native-aws3';
import envConfig from '../../envConfig'

export const uploadToAWS = (file, userId) => {

  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: file,
    name: `profile-pic-${userId}.jpg`,
    type: "image/jpg"
  }
  const { AWSAccessKeyID, AWSSecretKey } = envConfig.development

  const options = {
    keyPrefix: "uploads/",
    bucket: "friend-them",
    region: "us-east-1",
    accessKey: `${AWSAccessKeyID}`,
    secretKey: `${AWSSecretKey}`,
    successActionStatus: 201
  }

  RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");
    console.log(response.body);
    /**
     * {
     *   postResponse: {
     *     bucket: "your-bucket",
     *     etag : "9f620878e06d28774406017480a59fd4",
     *     key: "uploads/image.png",
     *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
     *   }
     * }
     */
  });


}
