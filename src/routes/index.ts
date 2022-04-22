import express from "express";
import user from "./user";

const router = express.Router();

const product = require("./proudct");

//Product
router.use("/product", product);
router.use("/user", user);
//...

export default router;
