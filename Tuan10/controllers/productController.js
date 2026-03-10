const dynamodb = require("../config/dynamodb");
const { v4: uuidv4 } = require("uuid");

const TABLE = "Products";

exports.home = async (req, res) => {
  try {
    const data = await dynamodb
      .scan({
        TableName: TABLE,
      })
      .promise();

    res.render("home", { products: data.Items });
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
};

exports.showAdd = (req, res) => {
  res.render("add");
};

exports.addProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  const product = {
    id: uuidv4(),
    name,
    price,
    quantity,
    image: req.file ? req.file.location : "",
  };

  await dynamodb
    .put({
      TableName: TABLE,
      Item: product,
    })
    .promise();

  res.redirect("/");
};

exports.deleteProduct = async (req, res) => {
  await dynamodb
    .delete({
      TableName: TABLE,
      Key: { id: req.params.id },
    })
    .promise();

  res.redirect("/");
};

exports.showEdit = async (req, res) => {
  const data = await dynamodb
    .get({
      TableName: TABLE,
      Key: { id: req.params.id },
    })
    .promise();

  res.render("edit", { product: data.Item });
};

exports.updateProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  let image = req.body.oldImage;

  if (req.file) {
    image = req.file.location;
  }

  await dynamodb
    .put({
      TableName: TABLE,
      Item: {
        id: req.params.id,
        name,
        price,
        quantity,
        image,
      },
    })
    .promise();

  res.redirect("/");
};