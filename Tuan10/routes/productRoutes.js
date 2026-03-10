const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

router.get("/", productController.home);

router.get("/add", productController.showAdd);

router.post("/add", upload.single("image"), productController.addProduct);

router.get("/delete/:id", productController.deleteProduct);

router.get("/edit/:id", productController.showEdit);

router.post("/edit/:id", upload.single("image"), productController.updateProduct);

module.exports = router;