const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.getAll);

router.get("/add", controller.showAdd);
router.post("/add", controller.create);

router.get("/edit/:id", controller.showEdit);
router.post("/edit/:id", controller.update);   // 👈 QUAN TRỌNG

router.get("/delete/:id", controller.delete);

module.exports = router;