import { Router } from "express";
import {
  isAuthenticated,
  login,
  logout,
  signup,
  verifyOTP,
} from "../controllers/auth_controllers.js";
import { authenticateJwt } from "../middlewares/jwt_middleware.js";
import validate from "../middlewares/validate.js";
import {
  signupSchema,
  loginSchema,
  verifyOTPSchema,
} from "../schemas/auth_schemas.js";

const router = Router();

router.route("/signup").post(validate(signupSchema), signup);
router.route("/login").post(validate(loginSchema), login);
router.route("/logout").post(logout);
router.route("/isAuthenticated").get(authenticateJwt, isAuthenticated);
router.route("/verify-otp").post(validate(verifyOTPSchema), verifyOTP);
export default router;
