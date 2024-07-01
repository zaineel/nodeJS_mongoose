const express = require("express");
const router = express.Router();
const Product = require("../Models/Product.model");

const ProductController = require("../Controllers/Product.controller");

router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.createNewProduct);
router.get("/:id", ProductController.findProductById);
router.patch("/:id", ProductController.updateAProduct);
router.delete("/:id", ProductController.deleteAProduct);

module.exports = router;
