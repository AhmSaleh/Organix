import express from "express";
import user from "./user";
import category from "./Category";

const router = express.Router();

const product = require("./proudct");

const order = require("./order");
//api/Product
router.use("/product", product);
router.use("/user", user);
//Order
router.use("/order",order);
router.use("/category", category);

export default router;
