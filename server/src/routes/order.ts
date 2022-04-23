import express from "express";
const router = express.Router();

import OrderController from "../controllers/OrderController";

router.get("/all",OrderController.getAll);
router.get("/one/:id",OrderController.getOne)
router.get("/userorders/:id",OrderController.getAllUserID)
router.post("/addorder",OrderController.addOrder);

module.exports = router;