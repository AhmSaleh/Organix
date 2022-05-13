import express from "express";
import ProductController from "../controllers/Product.Controller";
import checkRole from "../middleware/authentication";
import { RoleEnum } from "../model/UserModel";
import envconf from "../envconf";

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, envconf.ProductImgPath);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", ProductController.GETProducts);
router.get("/allCount", ProductController.GETProductsCount);
router.get("/CatgCount", ProductController.GETProductsByCatCount);
router.get("/:id", ProductController.GETProductById);
router.get("/name/:name", ProductController.GETProductByName);
router.get("/search/:search", ProductController.GETProductBySearch);
router.get("/category/:category", ProductController.GETProductByCategory);
router.post(
  "/",
  upload.single("imgURL"),
  (req: any, res: any, next: any) => {
    if (req.file) req.body.imgURL = req.file.path;
    req.body.price = Number.parseFloat(req.body.price);
    req.body.availableInventory = Number.parseInt(req.body.availableInventory);
    req.body.weight = Number.parseFloat(req.body.weight);
    next();
  },
  checkRole(RoleEnum.admin),
  ProductController.POSTProduct
);
router.delete(
  "/:id",
  checkRole(RoleEnum.admin),
  ProductController.DELETEProductById
);
router.patch(
  "/:id",
  checkRole(RoleEnum.admin),
  ProductController.UPDATEProductById
);

export default router;
