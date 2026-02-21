import { Router } from "express";
import {
  isAuthenticated,
  login,
  logout,
  signup,
} from "../controllers/auth_controllers.js";
import { authenticateJwt } from "../middlewares/jwt_middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/isAuthenticated").get(authenticateJwt, isAuthenticated);

export default router;
