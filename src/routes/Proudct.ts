import express from "express";
import ProductController from "../controllers/Product.Controller";
import checkRole from "../middleware/authentication";
import { RoleEnum } from "../model/UserModel";

const router = express.Router();

router.get("/", ProductController.GETProducts);
router.get("/:id", ProductController.GETProductById);
router.get("/search/:name", ProductController.GETProductByName);
router.get("/category/:category", ProductController.GETProductByCategory);
router.post("/", checkRole(RoleEnum.admin), ProductController.POSTProduct);
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

router.get("/list/:list",ProductController.GETProductList)


export default router;
