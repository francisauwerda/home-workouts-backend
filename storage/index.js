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

const uploadFile = (filePath, fileKey) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: fileContent,
    ACL: "public-read"
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, function(error, data) {
      if (error) {
        console.log('\n---\n Error found:\n', error, '\n---');
        reject(error);
      }

      console.log('\n---\n File uploaded successfully:\n', data.Location, '\n---');
      resolve(data.Location)
    });
  })
}

const deleteObject = (fileKey) => {
  if (!fileKey) return;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey
  }
  
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, function(error, data) {
      if (error) {
        console.log('\n---\n Error found:\n', error, '\n---');
        reject(error);
      }

      console.log(`\n---\n Object deleted with key: ${fileKey} \n---\n`);
      resolve(data);
    })
  })
}

module.exports = {
  uploadFile,
  deleteObject
}
