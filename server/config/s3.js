const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "eu-west-par",
  endpoint: "https://s3.eu-west-par.io.cloud.ovh.net",
  credentials: {
    accessKeyId: "396b9d150dc246738558cb0eb58ab1ef",
    secretAccessKey: "c798342b351c41638e2087736933ea08"
  },
  forcePathStyle: true
});

module.exports = { s3 };
