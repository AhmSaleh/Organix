import express from "express";
import user from "./user";

const router = express.Router();

const product = require("./proudct");

const order = require("./order");
//Product
router.use("/product", product);
router.use("/user", user);
//Order
router.use("/order",order);

export default router;
