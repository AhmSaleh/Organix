import express from "express";
import user from "./user";
import category from "./Category";
import product from "./Proudct"
import order from "./order";
const router = express.Router();



//api/Product
router.use("/product", product);
router.use("/user", user);
//Order
router.use("/order",order);
router.use("/category", category);

export default router;
