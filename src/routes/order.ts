import express from "express";
const router = express.Router();

import OrderController from "../controllers/OrderController";
import checkRole from "../middleware/authentication";
import { RoleEnum } from "../model/UserModel";

// router.get("/all",OrderController.getAll);
// router.get("/one/:id",OrderController.getOne)
// router.get("/userorders/:id",OrderController.getAllUserID)


router.get("/orders",checkRole(RoleEnum.admin,RoleEnum.merchant,RoleEnum.user),OrderController.getOrders)
router.post('/create',OrderController.createOrder);
router.post('/capture',OrderController.captureOrder);
router.patch("/updateorder",checkRole(RoleEnum.admin,RoleEnum.merchant,RoleEnum.user),OrderController.updateOrder)

export default router;