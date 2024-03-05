import { Router } from "express";
const router = Router();
import authController from "../controllers/authController.js";
import loginLimiter from "../middleware/loginlimiter.js";

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

export default router;
