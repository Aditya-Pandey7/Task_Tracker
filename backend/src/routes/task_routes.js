import { authenticateJwt } from "../middlewares/jwt_middleware.js";
import { Router } from "express";
import {
  getallTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../controllers/task_controllers.js";
import validate from "../middlewares/validate.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../schemas/task_shemas.js";

const router = Router();

router.route("/").get(authenticateJwt, getallTasks);
router.route("/").post(authenticateJwt, validate(createTaskSchema), createTask);
router.route("/:id").put(authenticateJwt, validate(updateTaskSchema), updateTask);
router.route("/:id").delete(authenticateJwt, deleteTask);

export default router;
