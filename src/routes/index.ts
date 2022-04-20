import express from "express";

const router = express.Router();


const product = require("./proudct");

//Product
router.use("/product", product);

//...

export default router;
