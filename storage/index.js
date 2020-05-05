// TODO: Move folder into /server? s
require('dotenv').config();

const AWS = require('aws-sdk');
const fs = require('fs');

const ID = process.env.AWSAccessKeyId;
const SECRET = process.env.AWSSecretKey;
const BUCKET_NAME = process.env.BucketName;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (filename) => {
  const fileContent = fs.readFileSync(filename);

  const params = {
    Bucket: BUCKET_NAME,
    Key: 'dips2.jpg', // TODO: convert key to filename and serialize.
    Body: fileContent
  }

  s3.upload(params, function(err, data) {
    if (err) {
      console.log('\n---\n err:\n', err, '\n---');
      throw err;
    }
    console.log('\n---\n File uploaded successfully:\n', data.Location, '\n---');
    return data.Location;
  })
}

// const IMG_URL = 'images/dips.jpg'
// uploadFile(IMG_URL);
module.exports = {
  uploadFile
}
