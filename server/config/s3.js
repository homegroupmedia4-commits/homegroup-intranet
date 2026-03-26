const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "eu-west-par",
  endpoint: "https://s3.eu-west-par.io.cloud.ovh.net",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  },
  forcePathStyle: true
});

module.exports = { s3 };
