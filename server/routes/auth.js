import express from "express";
import {
    allUser,
    deleteUser,
    filterUser,
    getUser,
    login,
    loginAdmin,
    updateUser,
} from "../controller/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/admin", loginAdmin);

router.get("/", allUser);

router.get("/filter", filterUser);

router.get("/:id", getUser);

router.delete("/delete/:id", deleteUser);

router.put("/update/:id", updateUser);

export default router;
