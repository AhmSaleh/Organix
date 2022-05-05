import express from "express";
const router = express.Router();

import UserController from "../controllers/UserController";
import checkRole from "../middleware/authentication";
import checkSchema from "../middleware/validation";
import { RoleEnum } from "../model/UserModel";

router.post("/",
    checkSchema("userLogin"),
    UserController.postLogin);

router.post("/register",checkSchema("userRegestraion"),UserController.postRegister);
router.post("/register/admin",
            checkRole(RoleEnum.admin),
            checkSchema("RegestraionByAdmin"),
            UserController.postRegister);


router.get("/all",checkRole(RoleEnum.admin),UserController.getAll);


router.get("/:email",checkRole(RoleEnum.admin,RoleEnum.merchant,RoleEnum.user),UserController.getProfile);

export default router;