const express = require('express');
const router = express.Router();
const { ScanCommand, PutCommand, GetCommand, UpdateCommand, DeleteCommand } =
require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');
const db = require('../config/dynamodb');
require('dotenv').config();

const TABLE = process.env.DYNAMODB_TABLE;

// READ
router.get('/', async(req, res) => {
    const data = await db.send(
        new ScanCommand({ TableName: TABLE })
    );
    res.render('products', { products: data.Items || [] });
});

// CREATE
router.post('/add', async(req, res) => {
    const { name, price, quantity } = req.body;

    await db.send(
        new PutCommand({
            TableName: TABLE,
            Item: {
                id: uuidv4(),
                name,
                price: Number(price),
                quantity: Number(quantity)
            }
        })
    );

    res.redirect('/');
});

// DELETE
router.post('/delete/:id', async(req, res) => {
    await db.send(
        new DeleteCommand({
            TableName: TABLE,
            Key: { id: req.params.id }
        })
    );
    res.redirect('/');
});

// EDIT FORM
router.get('/edit/:id', async(req, res) => {
    const data = await db.send(
        new GetCommand({
            TableName: TABLE,
            Key: { id: req.params.id }
        })
    );
    res.render('edit', { product: data.Item });
});

// UPDATE
router.post('/update/:id', async(req, res) => {
    const { name, price, quantity } = req.body;

    await db.send(
        new UpdateCommand({
            TableName: TABLE,
            Key: { id: req.params.id },
            UpdateExpression: "set #n=:n, price=:p, quantity=:q",
            ExpressionAttributeNames: { "#n": "name" },
            ExpressionAttributeValues: {
                ":n": name,
                ":p": Number(price),
                ":q": Number(quantity)
            }
        })
    );

    res.redirect('/');
});

module.exports = router;