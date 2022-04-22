import express from "express";

const router = express.Router();

const product = require("./proudct");
const user = require("./user");
//Product
router.use("/product", product);
router.use("/user", user);
//...

export default router;
