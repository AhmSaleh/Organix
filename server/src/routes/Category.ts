import express from "express";
import CategoryController from "../controllers/CategoryController";
import envconf from "../envconf";
import checkRole from "../middleware/authentication";
import checkSchema from "../middleware/validation";
import { RoleEnum } from "../model/UserModel";

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, envconf.CategoryImgPath);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("imageUrl"),
  (req: any, res: any, next: any) => {
    if (req.file) req.body.imageUrl = req.file.path;
    next();
  },
  checkRole(RoleEnum.admin),
  CategoryController.POSTCategory
);

router.get("/all", CategoryController.GETCategories);

router.get("/image/:id", CategoryController.GETCategoryImage);

router.get("/:id", CategoryController.GETCategoryById);

router.delete(
  "/:id",
  checkRole(RoleEnum.admin),
  CategoryController.DELETECategoryById
);

router.patch(
  "/:id",
  upload.single("imageUrl"),
  (req: any, res: any, next: any) => {
    if (req.file) req.body.imageUrl = req.file.path;
    next();
  },
  checkRole(RoleEnum.admin),
  CategoryController.UPDATECategoryById
);

router.get("/name/:name", CategoryController.GETCategoryByName);

export default router;
