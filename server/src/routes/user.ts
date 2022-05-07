import express from "express";
const router = express.Router();

import UserController from "../controllers/UserController";
import checkRole from "../middleware/authentication";
import checkSchema from "../middleware/validation";
import { RoleEnum } from "../model/UserModel";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalnamer);
  },
});

const upload = multer({ storage: storage });

router.post("/", checkSchema("userLogin"), UserController.postLogin);

router.post(
  "/register",
  upload.single("img"),
  // checkSchema("userRegestraion"),
  UserController.postRegister
);
router.post(
  "/register/admin",
  checkRole(RoleEnum.admin),
  checkSchema("RegestraionByAdmin"),
  UserController.postRegister
);

router.get("/all", checkRole(RoleEnum.admin), UserController.getAll);

router.get(
  "/:email",
  checkRole(RoleEnum.admin, RoleEnum.merchant, RoleEnum.user),
  UserController.getProfile
);
router.get("/merchant/:id", UserController.getMerchant);

export default router;
