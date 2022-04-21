import express from "express";
const router = express.Router();

import UserController from "../controllers/UserController";

router.post("/",UserController.postLogin);
router.post("/register",UserController.postRegister);


router.get("/all",UserController.getAll);


router.get("/:email",UserController.getProfile);

module.exports = router;