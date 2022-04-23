import express from "express";

const router = express.Router();

const product = require("./proudct");
const user = require("./user")
const order = require("./order");
//Product
router.use("/product", product);
router.use("/user", user);
//Order
router.use("/order",order);

export default router;
