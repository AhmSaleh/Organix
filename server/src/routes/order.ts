import express from "express";
const router = express.Router();

import OrderController from "../controllers/OrderController";

router.get("/all",OrderController.getAll);
router.get("/one/:id",OrderController.getOne)
router.get("/userorders/:id",OrderController.getAllUserID)

router.post('/create',OrderController.createOrder);
router.post('/capture',OrderController.captureOrder);

export default router;