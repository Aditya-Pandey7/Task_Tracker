import { User } from "../models/user_model.js";
import ApiResponse from "../utils/ApiResposne.js";
import createToken from "../utils/createToken.js";
import bycrypt from "bcryptjs";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json(ApiResponse(res, 400, null, "User already exists"));
  }
  const hashPassword = await bycrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  const finalUser = {
    username: newUser.username,
    email: newUser.email,
    id: newUser._id,
  };
  await newUser.save();
  const token = createToken(newUser);
  console.log(token);
  res
    .cookie("token", token, options)
    .status(201)
    .json(
      ApiResponse(
        res,
        201,
        { ...finalUser, token },
        "User created successfully",
      ),
    );
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(ApiResponse(res, 400, null, "User not found"));
  }
  const isPasswordValid = await bycrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json(ApiResponse(res, 400, null, "Invalid password"));
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
    .json(ApiResponse(res, 200, finalUser, "User logged in successfully"));
};

const logout = (req, res) => {
  res
    .clearCookie("token", options)
    .status(200)
    .json(ApiResponse(res, 200, null, "User logged out successfully"));
};

const isAuthenticated = (req, res) => {
  finalUser = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };
  return res
    .status(200)
    .json(ApiResponse(res, 200, finalUser, "User is authenticated"));
};

export { signup, login, logout, isAuthenticated };
