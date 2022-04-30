import express from "express";
import user from "./user";
import cart from "./cart";


const router = express.Router();

const product = require("./proudct");

const order = require("./order");

//Product
router.use("/product", product);
router.use("/user", user);
//Order
router.use("/order",order);
//Cart
router.use("/cart",cart)

export default router;
