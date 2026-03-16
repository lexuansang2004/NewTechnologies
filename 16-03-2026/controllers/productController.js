const Product = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

exports.list = async(req, res) => {

    const products = await Product.getAll();

    res.render("products/list", { products });

};

exports.showAdd = (req, res) => {

    res.render("products/add");

};

exports.add = async(req, res) => {

    const imagePath = req.file ?
        "/images/" + req.file.filename :
        "";

    const product = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
        unit_in_stock: req.body.unit_in_stock,
        url_image: imagePath
    };

    await Product.create(product);

    res.redirect("/?msg=added")

};

exports.detail = async(req, res) => {

    const product = await Product.getById(req.params.id);

    res.render("products/detail", { product });

};

exports.showEdit = async(req, res) => {

    const product = await Product.getById(req.params.id);

    res.render("products/edit", { product });

};

exports.update = async(req, res) => {

    const id = req.params.id;
    const { name, price, unit_in_stock } = req.body;

    const product = await Product.getById(id); // lấy product cũ

    let imageUrl = product.url_image;

    // nếu có upload ảnh mới
    if (req.file) {

        // xóa ảnh cũ nếu tồn tại
        if (product.url_image) {

            const oldPath = path.join(
                __dirname,
                "../public",
                product.url_image
            );

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // lưu ảnh mới
        imageUrl = "/images/" + req.file.filename;
    }

    await Product.update({
        id,
        name,
        price,
        unit_in_stock,
        url_image: imageUrl
    });

    res.redirect("/");
};

exports.delete = async(req, res) => {

    await Product.delete(req.params.id);

    res.redirect("/?msg=deleted")

};