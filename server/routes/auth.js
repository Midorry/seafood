import express from "express";
import {
    allUser,
    deleteUser,
    getUser,
    login,
    updateUser,
} from "../controller/AuthController.js";

const router = express.Router();

router.post("/login", login);

router.get("/", allUser);

router.get("/:id", getUser);

router.delete("/delete/:id", deleteUser);

router.put("/update/:id", updateUser);

export default router;
