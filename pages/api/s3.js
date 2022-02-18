// file to write things for the aws sdk
const AWS = require("aws-sdk");

export default function handler(req, res) {
  connect2s3();
  res.send(process.env.aws_access_key_id);
}

function connect2s3() {
  const s3 = new AWS.S3({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
  });

  const params = {
    Bucket: "funngagedev",
  };

  s3.listObjectsV2(params, (err, data) => {
    console.log(data);
  });
}
