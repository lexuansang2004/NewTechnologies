require("dotenv").config();
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const params = {
  TableName: process.env.DDB_TABLE_PRODUCTS,
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  BillingMode: "PAY_PER_REQUEST"
};

client.send(new CreateTableCommand(params))
  .then(() => console.log("Table created"))
  .catch(err => console.error(err));
