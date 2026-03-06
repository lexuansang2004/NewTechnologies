const dynamodb = require("../models/dynamodb");
const { v4: uuidv4 } = require("uuid");

const TABLE_NAME = "Products";

// ======================
// GET ALL PRODUCTS
// ======================
exports.getAll = async (req, res) => {
  try {

    console.log("Loading products...");
    console.log("Connecting DynamoDB...");

    const params = {
      TableName: TABLE_NAME
    };

    const data = await dynamodb.scan(params).promise();

    console.log("Data:", data);

    res.render("index", {
      products: data.Items || []
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.send("Error loading products");
  }
};


// ======================
// SHOW ADD PAGE
// ======================
exports.showAdd = (req, res) => {
  res.render("add");
};


// ======================
// CREATE PRODUCT
// ======================
exports.create = async (req, res) => {
  try {
    const { name, price, url_image } = req.body;

    const params = {
      TableName: "Products",
      Item: {
        id: uuidv4(),
        name: name,
        price: Number(price),
        url_image: url_image
      }
    };

    console.log("Saving product...", params);

    await dynamodb.put(params).promise();

    console.log("Saved successfully");

    res.redirect("/");

  } catch (error) {
    console.error(error);
    res.send("Error saving product");
  }
};


// ======================
// SHOW EDIT PAGE
// ======================
exports.showEdit = async (req, res) => {
  try {

    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: req.params.id
      }
    };

    const data = await dynamodb.get(params).promise();

    if (!data.Item) {
      return res.send("Product not found");
    }

    res.render("edit", {
      product: data.Item
    });

  } catch (error) {
    console.error(error);
    res.send("Error loading edit page");
  }
};


// ======================
// UPDATE PRODUCT
// ======================
exports.update = async (req, res) => {

    const { name, price, url_image } = req.body;

    const params = {
        TableName: "Products",
        Key: {
            id: req.params.id
        },
        UpdateExpression: "set #n = :name, price = :price, url_image = :url_image",
        ExpressionAttributeNames: {
            "#n": "name"
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":price": Number(price),
            ":url_image": url_image
        }
    };

    await dynamodb.update(params).promise();

    res.redirect("/");
};


// ======================
// DELETE PRODUCT
// ======================
exports.delete = async (req, res) => {
  try {

    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: req.params.id
      }
    };

    await dynamodb.delete(params).promise();

    res.redirect("/");

  } catch (error) {
    console.error(error);
    res.send("Error deleting product");
  }
};