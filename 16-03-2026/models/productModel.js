const dynamoDB = require("../config/dynamodb");

const tableName = "Products";

exports.getAll = async() => {
    const params = { TableName: tableName };
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
};

exports.getById = async(id) => {
    const params = {
        TableName: tableName,
        Key: { id }
    };

    const data = await dynamoDB.get(params).promise();
    return data.Item;
};

exports.create = async(product) => {
    const params = {
        TableName: tableName,
        Item: product
    };

    return dynamoDB.put(params).promise();
};

exports.delete = async(id) => {
    const params = {
        TableName: tableName,
        Key: { id }
    };

    return dynamoDB.delete(params).promise();
};

exports.update = async(product) => {
    const params = {
        TableName: tableName,
        Item: product
    };

    return dynamoDB.put(params).promise();
};