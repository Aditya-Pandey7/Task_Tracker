import { User } from "../models/user_model.js";
import sendEmail from "../services/email_service.js";
import ApiResponse from "../utils/ApiResposne.js";
import createToken from "../utils/createToken.js";
import bycrypt from "bcrypt";
import { otpLoginTemplate } from "../utils/otp_email_template.js";
import generateOTP from "../utils/generate_otp.js";
import { Task } from "../models/task_model.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 7000, // 1 week
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json(ApiResponse(400, null, "User already exists"));
  }
  const hashPassword = await bycrypt.hash(password, 10);
  const otp = generateOTP();

  User.create({
    username,
    email,
    password: hashPassword,
    otp,
    otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
  });
  await sendEmail(
    email,
    "Welcome to Task Tracker ",
    otpLoginTemplate(username, otp),
  );

  res
    .status(201)
    .json(
      ApiResponse(
        201,
        null,
        "OTP sent to email, please verify to complete registration",
      ),
    );
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(ApiResponse(400, null, "User not found"));
  }

  if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  user.otp = null;
  user.otpExpiresAt = null;
  user.isOTPVerified = true;
  await user.save();
  const token = createToken(user);
  const finalUser = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  res
    .cookie("token", token, options)
    .status(200)
    .json(
      ApiResponse(
        200,
        finalUser,
        "OTP verified successfully, registration complete",
      ),
    );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(ApiResponse(400, null, "User not found"));
  }
  const isPasswordValid = await bycrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json(ApiResponse(400, null, "Invalid password"));
  }
  const token = createToken(user);
  const finalUser = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  res
    .cookie("token", token, options)
    .status(200)
    .json(ApiResponse(200, finalUser, "User logged in successfully"));
};

const logout = (req, res) => {
  res
    .clearCookie("token", options)
    .status(200)
    .json(ApiResponse(200, null, "User logged out successfully"));
};

const isAuthenticated = async (req, res) => {
  const allTasks = await Task.find({ user: req.user._id });

  const finalUser = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    tasks: allTasks,
  };
  return res
    .status(200)
    .json(ApiResponse(200, finalUser, "User is authenticated"));
};

export { signup, login, logout, isAuthenticated, verifyOTP };
