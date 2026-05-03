import { Router } from "express";
import { loginPage, login, logout } from "../controllers/authController";

const router = Router();

router.get("/login", loginPage);
router.post("/login", login);
router.get("/logout", logout);

export default router;