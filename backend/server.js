import { configDotenv } from "dotenv";
configDotenv(); // Must be called before importing modules that use env vars

import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";

// Dynamic import to ensure env vars are loaded first
await import("./src/middlewares/jwt_middleware.js");

const app = express();
app.use(
  cors({
    origin: process.env.frontend_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connectDB();

// Routes import (dynamic to ensure env vars are loaded first)
const { default: taskRoutes } = await import("./src/routes/task_routes.js");
const { default: userRoutes } = await import("./src/routes/auth_routes.js");
import ErrorHandler from "./src/utils/ErrorHandler.js";

// Routes uses
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", userRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Server Error" } = err;
  console.log(err);
  res.status(statusCode).json(new ErrorHandler(message, statusCode, err.name));
});
