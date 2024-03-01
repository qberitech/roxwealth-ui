import aws from 'aws-sdk';

const UploadToS3 = async file => {
  const s3 = new aws.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  });

  const params = {
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    Key: file.name,
    Body: file
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};

export default UploadToS3;
