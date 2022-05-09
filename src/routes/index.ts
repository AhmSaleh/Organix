import express from "express";
import user from "./user";
import cart from "./cart";


import category from "./Category";
import product from "./Proudct"
import order from "./order";
const router = express.Router();


//Product

//api/Product
router.use("/product", product);
router.use("/user", user);
//Order
router.use("/order",order);
//Cart
router.use("/cart",cart)
router.use("/category", category);

export default router;
