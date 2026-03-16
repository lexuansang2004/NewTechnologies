require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.DYNAMODB_ENDPOINT
});

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: "Products",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Table created:", data);
    }
});