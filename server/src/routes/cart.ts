import express from "express";
const router = express.Router();

import CartController from "../controllers/CartController";

router.get("/:id",CartController.getCart);
router.post("/",CartController.UpdateCart);

export default router;