const { v4: uuidv4 } = require("uuid");
const docClient = require("../models/dynamodb");
const {
  PutCommand,
  ScanCommand,
  DeleteCommand,
  GetCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const TABLE = process.env.DDB_TABLE_PRODUCTS;

// READ
exports.index = async (req, res) => {
  const data = await docClient.send(
    new ScanCommand({ TableName: TABLE })
  );
  res.render("index", { products: data.Items || [] });
};

// CREATE FORM
exports.create = (req, res) => {
  res.render("create");
};

// STORE
exports.store = async (req, res) => {
  const { name, price, url_image } = req.body;

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        id: uuidv4(),
        name,
        price: Number(price),
        url_image,
      },
    })
  );

  res.redirect("/");
};

// EDIT
exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { id },
    })
  );

  if (!data.Item) {
    return res.send("Product not found");
  }

  res.render("edit", { product: data.Item });
};

// UPDATE
exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, price, url_image } = req.body;

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression:
        "SET #n = :name, price = :price, url_image = :url_image",
      ExpressionAttributeNames: {
        "#n": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":price": Number(price),
        ":url_image": url_image,
      },
    })
  );

  res.redirect("/");
};

// DELETE
exports.delete = async (req, res) => {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: { id: req.params.id },
    })
  );

  res.redirect("/");
};
