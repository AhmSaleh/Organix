import express from "express";
const router = express.Router();

import CategoryController from "../controllers/CategoryController";
import checkRole from "../middleware/authentication";
import checkSchema from "../middleware/validation";
import { RoleEnum } from "../model/UserModel";

router.post("/",
    checkRole(RoleEnum.admin),
    checkSchema("category"),
    CategoryController.POSTCategory);

router.get("/all",
    CategoryController.GETCategories);

router.get("/:id",
    CategoryController.GETCategoryById);


router.delete("/:id",
    CategoryController.DELETECategoryById);

router.put("/:id",
    checkRole(RoleEnum.admin),
    checkSchema("category"),
    CategoryController.UPDATECategoryById);


router.get("/name/:name",
    CategoryController.GETCategoryByName);


export default router;