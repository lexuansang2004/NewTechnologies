const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");
const upload = require("../config/multer");

router.get("/", controller.list);

router.get("/add", controller.showAdd);
router.post("/add", upload.single("image"), controller.add);

router.get("/detail/:id", controller.detail);

router.get("/edit/:id", controller.showEdit);
router.post("/edit/:id", upload.single("image"), controller.update);

router.get("/delete/:id", controller.delete);

module.exports = router;