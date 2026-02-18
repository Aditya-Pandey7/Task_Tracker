import { User } from "../models/user_model.js";
import ApiResponse from "../utils/ApiResposne.js";
import createToken from "../utils/createToken.js";

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
  const newUser = new User({ username, email, password });
  const finalUser = {
    username: newUser.username,
    email: newUser.email,
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
  if (user.password !== password) {
    return res
      .status(400)
      .json(ApiResponse(res, 400, null, "Invalid password"));
  }
  const token = createToken(user);
  res
    .cookie("token", token, options)
    .status(200)
    .json(
      ApiResponse(
        res,
        200,
        { ...user.toObject(), token },
        "User logged in successfully",
      ),
    );
};

const logout = (req, res) => {
  res
    .clearCookie("token", options)
    .status(200)
    .json(ApiResponse(res, 200, null, "User logged out successfully"));
};

export { signup, login, logout };
