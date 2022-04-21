const express = require("express");
const ProductController = require("../controllers/Product.Controller");

const router = express.Router();

router.get("/", ProductController.GETProducts);
router.get("/:id", ProductController.GETProductById);
router.post("/", ProductController.POSTProduct);
router.delete("/:id", ProductController.DELETEProductById);
router.patch("/:id", ProductController.UPDATEProductById);

module.exports = router;
