import express from "express";
const router = express.Router();

import UserController from "../controllers/UserController";
import checkRole from "../middleware/authentication";
import checkSchema from "../middleware/validation";
import rowData from "../middleware/rowData";
import { RoleEnum } from "../model/UserModel";
import envconf from "../envconf";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, envconf.UsersPfpPath);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.get("/all", checkRole(RoleEnum.admin), UserController.getAll);
router.post("/", checkSchema("userLogin"), UserController.postLogin);

router.post(
  "/register",
  upload.single("img"),
  rowData,
  checkSchema("userRegestraion"),
  UserController.postRegister
);

// router.post(
//   "/register-pfp",
//   upload.single("img"),
//   rowData,
//   UserController.postRegisterPFP
// );

router.post(
  "/register/admin",
  checkRole(RoleEnum.admin),
  checkSchema("RegestraionByAdmin"),
  UserController.postRegister
);

router.get("/all", checkRole(RoleEnum.admin), UserController.getAll);

router.get("/merchant/:id", UserController.getMerchant);

router.get("/users/:id", checkRole(RoleEnum.admin), UserController.GETUserById);

router.get(
  "/:email",
  checkRole(RoleEnum.admin, RoleEnum.merchant, RoleEnum.user),
  UserController.getProfile
);

router.get(
  "/addresses/:email",
  checkRole(RoleEnum.user),
  UserController.getAddresses
);

router.get(
  "/pfp/:email",
  checkRole(RoleEnum.admin, RoleEnum.merchant, RoleEnum.user),
  UserController.getPFP
);
router.patch(
  "/:email",
  upload.single("img"),
  rowData,
  checkRole(RoleEnum.admin, RoleEnum.merchant, RoleEnum.user),
  UserController.UPDATEUserProfileByEmail
);

router.patch(
  "/admin/:email",
  checkRole(RoleEnum.admin),
  checkSchema("SchemaUpdateUserByAdmin"),
  UserController.UPDATEUserByAdmin
);

export default router;
