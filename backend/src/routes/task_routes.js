import { authenticateJwt } from "../middlewares/jwt_middleware.js";
import { Router } from "express";
import {
  getallTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../controllers/task_controllers.js";

const router = Router();

router.route("/").get(authenticateJwt, getallTasks);
router.route("/").post(authenticateJwt, createTask);
router.route("/:id").put(authenticateJwt, updateTask);
router.route("/:id").delete(authenticateJwt, deleteTask);

export default router;
