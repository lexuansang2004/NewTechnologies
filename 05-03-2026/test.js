require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB();

async function test() {
  try {
    const tables = await dynamodb.listTables().promise();
    console.log(tables);
  } catch (err) {
    console.error(err);
  }
}

test();