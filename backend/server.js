import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./src/db/index.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connectDB();

// Routes import
import taskRoutes from "./src/routes/task_routes.js";
import ErrorHandler from "./src/utils/ErrorHandler.js";

// Routes uses
app.use("/api/v1/tasks", taskRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Server Error" } = err;
  console.log(err);
  res.status(statusCode).json(new ErrorHandler(message, statusCode, err.name));
});
