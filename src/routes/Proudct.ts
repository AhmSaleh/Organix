import express from "express";
import ProductController from "../controllers/Product.Controller";

const router = express.Router();

router.get("/", ProductController.GETProducts);
router.get("/:id", ProductController.GETProductById);
router.post("/", ProductController.POSTProduct);
router.delete("/:id", ProductController.DELETEProductById);
router.patch("/:id", ProductController.UPDATEProductById);

module.exports = router;
